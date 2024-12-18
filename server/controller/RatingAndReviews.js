const ratingAndReview = require('../model/Rating');
const Course = require('../model/Course');
const { default: mongoose } = require('mongoose');



exports.createRating = async (req, res) => {
    try {
        // Get user ID from the request
        const userId = req.user.id;
        // Fetch data from the request body
        const { rating, review, courseId } = req.body;

        // Check if the course exists and if the user is enrolled
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }

        // Check if the user has already reviewed the course
        const alreadyReviewed = await ratingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }

        // Create the rating and review
        const ratingReview = await ratingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });

        // Push the new rating/review into the course's ratingAndReviews array
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: { ratingAndReviews: ratingReview._id },
            },
            { new: true }
        );

        console.log(updatedCourseDetails);

        // Return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};







exports.getAverageRating = async (req, res) => { 
    try {
        const { courseId } = req.query; // Use req.query if you're using GET

        // Check if courseId is provided
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        // Check if courseId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid courseId",
            });
        }

        const result = await ratingAndReview.aggregate([
            {
                $match: {
                    course: mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "No ratings available",
            averageRating: 0,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while calculating average rating",
        });
    }
};

 

exports.getAllRating = async(req,res) =>{

    try {
        const allReviews = await ratingAndReview.find({})
                                              .sort({rating: "desc"})
                                              .populate({
                                                path:"user",
                                                select: "firstName lastName email image",
                                              })
                                              .populate({
                                                   path:"course",
                                                   select:"courseName",
                                              })
                                              .exec();

                    return res.status(200).json({
                        success:true,
                        message:"All reviews fetched successfully",
                        data: allReviews,
                    });
                    
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success:false,
          message: "Something went wrong while fetching all reviews",
        });
    }
}


exports.getCourseReview = async(req, res) => {

    try {
        const{courseId} = req.body;
    
        if(!courseId){
          return res.status(400).json({
              success:false,
              message:"Course id required",
          });
        }
        
        const review = await ratingAndReview.find({course: courseId})
                                   .sort({rating: "desc"})
                                   .populate({
                                     path: "user",
                                     select: "firstName lastName email image",
                                   })
                                    .populate({
                                        path: "course",
                                        select: "courseName",
                                    })
                                    .exec();

            if(review.length == 0){
                return res.status(400).json({
                    success:false,
                    message:"Reviews not found",
                });
            }
            
            return res.status(200).json({
              success: true,
              message:"Review fetched successfully",
              data:review,
            });

    } catch (error) {
         console.log(error);
        res.status(500).json({
          success:false,
          message: "Something went wrong while fetching course reviews",
        });
    }
     






}