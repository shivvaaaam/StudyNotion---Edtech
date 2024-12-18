const Profile = require('../model/Profile');
const User = require('../model/User');
const {uploadImageToCloudinary} = require('../utils/cloudinary')
const {convertSecondsToDuration} = require("../utils/secToDuration")
const CourseProgress = require('../model/CourseProgress')
const Course = require('../model/Course');


exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;

    // Save the updated profile
    await profile.save();

    // Fetch the updated user details to return
    const updatedUserDetails = await User.findById(id)
      .populate('additionalDetails')  // Populate profile info
      .select('-password');           // Exclude sensitive info if needed

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails, // Return the full updated user details
    });
  } catch (error) {
    console.log("UPDATE_PROFILE_API ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



exports.deleteAccount = async(req, res) =>{

    try {
        const id = req.user.id;
    
        const userDetails = await User.findById(id);
    
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: "Empty details, Please fill all the details",
            });
        }
    
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    
        await User.findByIdAndDelete({id:id});

        return res.status(200).json({
            success:true,
            message: "Profile deleted successfully",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating profile",
          });
    }

 
}

exports.getAllUserDetails = async(req, res) =>{

    try {
        const id = req.user.id;

        const userDetail = await User.findById(id).populate("additionalDetails").exec();
        
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success:true,
            message: "User Details fetched successfully",
            data: userDetail
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while fetching user details",
          });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
  try {
      const userId = req.user.id;

      let userDetails = await User.findOne({ _id: userId })
          .populate({
              path: "courses",
              populate: {
                  path: "courseContent",
                  populate: { path: "subSection" },
              },
          });

      if (!userDetails) {
          return res.status(400).json({ success: false, message: `User not found with id: ${userId}` });
      }

      userDetails = userDetails.toObject();

      for (let i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0;
          let subSectionLength = 0;

          if (userDetails.courses[i].courseContent) {
              for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                  if (userDetails.courses[i].courseContent[j].subSection) {
                      totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
                          (acc, curr) => acc + (parseInt(curr.timeDuration) || 0),
                          0
                      );
                      subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
                  }
              }
          }

          userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

          let courseProgressCount = await CourseProgress.findOne({
              courseId: userDetails.courses[i]._id,
              userId: userId,
          });

          courseProgressCount = courseProgressCount?.completedVideos.length || 0;

          userDetails.courses[i].progressPercentage = subSectionLength === 0 ? 100 : 
              Math.round((courseProgressCount / subSectionLength) * 100 * 100) / 100;
      }

      return res.status(200).json({ success: true, data: userDetails.courses });
  } catch (error) {
      console.error("GET_USER_ENROLLED_COURSES_API Error:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
};


exports.instructorDashboard = async (req, res) =>{
   
    try {
      const courseDetails = await Course.find({instructor: req.user.id});
       
      const courseData  = courseDetails.map((course)=> {
        const totalStudentsEnrolled = course.studentEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
       
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
        return courseDataWithStats
      })
      res.status(200).json({courses:courseData});

    } catch (error) {
      console.error(error);
		  res.status(500).json({message:"Internal Server Error"});
    }
}

