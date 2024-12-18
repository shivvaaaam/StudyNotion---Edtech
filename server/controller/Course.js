const User = require('../model/User');
const Category = require('../model/Category');
const Course = require('../model/Course');
const Section = require('../model/Section');
const SubSection = require('../model/SubSection');
const {uploadImageToCloudinary} = require('../utils/cloudinary');

exports.createCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            courseName,
            courseDescription,
            price,
            category,
            status = "Draft",
            instructions: _instructions,
        } = req.body;

        const thumbnail = req.files.thumbnailImage;

        if (
            !courseName ||
            !courseDescription ||
            !price ||
            !thumbnail ||
            !category ||
            !_instructions
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        // Parse instructions
        let instructions;
        try {
            instructions = JSON.parse(_instructions);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid instructions format",
            });
        }

        // Validate instructor
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        // Validate category
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        // Upload thumbnail
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // Create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            instructions,
        });

        // Update instructor and category with new course
        await User.findByIdAndUpdate(instructorDetails._id, {
            $push: { courses: newCourse._id },
        });

        await Category.findByIdAndUpdate(
            categoryDetails._id,
            { $push: { course: newCourse._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course created successfully",
        });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};



  exports.getAllCourses = async (req, res) => {
	try {
	  // Find all courses with selected fields, including thumbnail
	  const allCourses = await Course.find(
		{},
		{
		  courseName: true,
		  price: true,
		  thumbnail: true, // Include thumbnail in the response
		  instructor: true,
		  ratingAndReviews: true,
		  studentEnrolled: true,
		}
	  )
		.populate("instructor", "name") // Assuming you're returning the instructor's name
		.exec();
  
	  res.status(200).json({
		success: true,
		data: allCourses,
		message: "All Courses fetched successfully",
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({
		success: false,
		message: "Cannot fetch course data",
		error: error.message,
	  });
	}
  };


  exports.getCourseDetails = async (req, res) => {
	try {
	  // Get course ID from request parameters
	  const { id: courseId } = req.params;
  
	  // Find course details, ensuring 'thumbnail', 'courseName', and 'courseDescription' are included
	  const courseDetails = await Course.findById(courseId)
		.select('thumbnail courseName courseDescription studentEnrolled createdAt price') // Explicitly include the fields you want
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec();
  
	  // Validation if course is found
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find the course with ID: ${courseId}`,
		});
	  }
  
	  // Return response
	  return res.status(200).json({
		success: true,
		message: "Course Details fetched successfully",
		data: courseDetails, // This includes courseName and courseDescription
	  });
	} catch (error) {
	  console.log(error);
	  return res.status(500).json({
		success: false,
		message: error.message,
	  });
	}
  };
  
  


  exports.editCourse = async (req, res) => {
	try {
		const { courseId } = req.body;

		// Check if courseId is provided
		if (!courseId) {
			return res.status(400).json({ error: "Missing courseId in request body" });
		}

		const course = await Course.findById(courseId);

		// Check if the course exists
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}

		// Update thumbnail if provided
		if (req.files && req.files.thumbnailImage) {
			try {
				const thumbnail = req.files.thumbnailImage;
				const thumbnailImage = await uploadImageToCloudinary(
					thumbnail,
					process.env.FOLDER_NAME
				);
				course.thumbnail = thumbnailImage.secure_url;
			} catch (err) {
				console.error("Error uploading thumbnail:", err);
				return res.status(500).json({ error: "Thumbnail upload failed" });
			}
		}

		// Update other fields
		const updates = req.body;
		for (const key in updates) {
			if (updates.hasOwnProperty(key)) {
				if (key === "instructions" || key === "tag") {
					try {
						course[key] = JSON.parse(updates[key]);
					} catch (err) {
						console.error(`Error parsing ${key}:`, err);
						return res.status(400).json({ error: `Invalid JSON for ${key}` });
					}
				} else if (key !== "courseId") {
					course[key] = updates[key];
				}
			}
		}

		// Save updated course
		await course.save();

		// Retrieve updated course with populated fields
		const updatedCourse = await Course.findById(courseId)
			.populate({
				path: "instructor",
				populate: { path: "additionalDetails" },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: { path: "subSection" },
			})
			.exec();

		res.json({
			success: true,
			message: "Course updated successfully",
			data: updatedCourse,
		});
	} catch (error) {
		console.error("Edit Course Error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

  
  

exports.getInstructorCourses = async (req, res) =>{

	try {
		const instructorId = req.user.id;

	const instructorCourses = await Course.find({
		instructor: instructorId,
	  }).sort({ createdAt: -1 })

	  res.status(200).json({
		success: true,
		data: instructorCourses,
	  })

	} catch (error) {
	  console.error(error)
      res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
	  
    })
	}

}


exports.deleteCourse = async (req, res) => {
	try {
	  const { courseId } = req.body
  
	  // Find the course
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }
  
	  // Unenroll students from the course
	  const studentEnrolled = course.studentEnrolled
	  for (const studentId of studentEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull: { courses: courseId },
		})
	  }
  
	  // Delete sections and sub-sections
	  const courseSections = course.courseContent
	  for (const sectionId of courseSections) {
		// Delete sub-sections of the section
		const section = await Section.findById(sectionId)
		if (section) {
		  const subSections = section.subSection
		  for (const subSectionId of subSections) {
			await SubSection.findByIdAndDelete(subSectionId)
		  }
		}
  
		// Delete the section
		await Section.findByIdAndDelete(sectionId)
	  }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)
  
	  return res.status(200).json({
		success: true,
		message: "Course deleted successfully",
	  })
	} catch (error) {
	  console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
  }


  exports.getFullCourseDetails = async (req, res) => {
	try {
	  const { courseId } = req.body;
	  const userId = req.user?.id;
  
	  if (!userId) {
		return res.status(401).json({
		  success: false,
		  message: "Unauthorized access, user ID not found",
		});
	  }
  
	  const courseDetails = await Course.findOne({ _id: courseId })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		});
  
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		});
	  }
  
	  // Commenting out CourseProgress part as discussed
	  // const courseProgressCount = await CourseProgress.findOne({
	  //   courseID: courseId,
	  //   userId: userId,
	  // });
  
	  // Check if course content exists
	  if (!courseDetails.courseContent || courseDetails.courseContent.length === 0) {
		return res.status(400).json({
		  success: false,
		  message: "Course content is missing",
		});
	  }
  
	  // Commenting out the part that calculates total duration
	  // let totalDurationInSeconds = 0;
	  // courseDetails.courseContent.forEach((content) => {
	  //   content?.subSection?.forEach((subSection) => {
	  //     const timeDurationInSeconds = parseInt(subSection.timeDuration, 10);
	  //     totalDurationInSeconds += timeDurationInSeconds;
	  //   });
	  // });
  
	  // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  // Commenting out totalDuration as it's not used
		  // totalDuration,
		  completedVideos: [], // Temporary placeholder
		},
	  });
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  });
	}
  };
  
  
  
  
  

