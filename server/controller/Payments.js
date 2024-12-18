const { default: mongoose } = require('mongoose');
const { instance } = require('../config/razorpay');
const Course = require('../model/Course');
const User = require('../model/User');
const mailSender = require('../utils/mailSender');
// const { json } = require('react-router-dom');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const crypto = require('crypto');
const CourseProgress = require('../model/CourseProgress');


// Initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide Course Id",
        });
    }

    let totalAmount = 0;
    let courseDetails = [];

    for (const course_id of courses) {
        try {
            const course = await Course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message: `Course with ID ${course_id} could not be found`,
                });
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled && course.studentEnrolled.includes(uid)) {
                return res.json({
                    success: false,
                    message: "Student is already Enrolled",
                });
            }

            totalAmount += course.price;
            courseDetails.push({
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
            });
        } catch (error) {
            console.error(`Error finding course with ID ${course_id}:`, error);
            return res.json({
                success: false,
                message: "Something went wrong while finding course",
            });
        }
    }

    const options = {
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            courseDetails,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }
};



// Verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:false, message:"Payment Failed"});

}


// Enroll students into courses
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or userId",
        });
    }

    for (const courseId of courses) {
        try {
            // Use $addToSet to avoid duplicates
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                { $addToSet: { studentEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found",
                });
            }

            // Create CourseProgress for the user
            const courseProgress = await CourseProgress.create({
                courseId: courseId, // Ensure this matches schema field name
                userId: userId,
                completedVideos: [],
            });

            // Enroll student in the user profile
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { courses: courseId, courseProgress: courseProgress._id } },
                { new: true }
            );

            // Send email notification
            await mailSender(
                enrolledStudent.email,
                `Successfully enrolled in ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );

        } catch (error) {
            console.log("Error enrolling student:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};


// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        });
    }

    try {
        // Find the enrolled user
        const enrolledStudent = await User.findById(userId);
        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Example: Get courseId from request (Assume it is passed in `req.body.courseId`)
        const courseId = req.body.courseId; // Ensure `courseId` is passed in the request
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Add the course to the user's enrolled courses
        enrolledStudent.enrolledCourses.push(course._id); // Assuming `enrolledCourses` is an array of course IDs
        await enrolledStudent.save();

        // Send a confirmation email
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(enrolledStudent.firstName, amount / 100, orderId, paymentId)
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent and course enrolled",
        });
    } catch (error) {
        console.error("Error in processing payment success:", error.message);
        return res.status(500).json({
            success: false,
            message: "Could not complete the purchase process",
        });
    }
};




// exports.capturePayment = async(req, res) =>{

//     try {

//         const userId = req.user.id;
//         const {course_id} = req.body;

//         if(!course_id){
//             return res.status(400).json({
//                 success:true,
//                 message:"Please provide course id",
//             });

//         }

//         let course;
//         course = await Course.findById(course_id);

//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Course doesn't exist",
//             });
//         }

//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)){
//             return res.json({
//                 success:false,
//                 message:"Student has already enrolled",
//             });
//         }
//     } catch (error) {

//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message: "Somthing went wrong while payment!!"
//         })

//     }

//     const amount = course.price;
//     const currency = "INR";


//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };


//     try {

//         const paymentResponse = await instancen.orders.create(options);
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         })


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message: "Could not initiat order"
//         })
//     }

// }


// exports.verifySignature = async (req, res) => {

//     const webhookSecret = "24681012";

//     const signature = req.header["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is authorised");

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {

//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentEnrolled: userId } },
//                 { new: true }
//             );

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: " Course not found",
//                 });
//             }

//             console.log(enrolledCourse);

//             const enrolledStudent = await User.findByIdAndUpdate(
//                 { _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true },
//             );

//             if (!enrolledStudent) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "User not found",
//                 });
//             }

//             console.log(enrolledStudent);

//             const emmailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "congratulations - By CodeHelp",
//                 "Onboarded"
//             )

//             console.log(emmailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified successfully",
//             });




//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 success: false,
//                 message: "Something went wrong !!!"
//             })
//         }

//     } else {
//         res.status(400).json({
//             success: false,
//             message: "Invalid request"
//         })
//     }
// }