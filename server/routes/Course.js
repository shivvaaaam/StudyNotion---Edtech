// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses, 
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails
} = require("../controller/Course")

const {
  updateCourseProgress
} = require('../controller/CourseProgress')


// Categories Controllers Import


// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controller/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
  getCourseReview,
} = require("../controller/RatingAndReviews")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
// Course Routes
router.post("/createCourse", auth, isInstructor, createCourse)  // Create a new course
router.post("/editCourse", auth, isInstructor, editCourse)       // Update/Edit a course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse) // Delete a course

// Section Routes
router.post("/addSection", auth, isInstructor, createSection)   // Add a new section to a course
router.post("/updateSection", auth, isInstructor, updateSection) // Update a section
router.post("/deleteSection", auth, isInstructor, deleteSection) // Delete a section

// Sub-Section Routes
router.post("/addSubSection", auth, isInstructor, createSubSection)  // Add a new sub-section to a section
router.post("/updateSubSection", auth, isInstructor, updateSubSection) // Update a sub-section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection) // Delete a sub-section

// Get Instructor's Courses
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)  // Get all courses of an instructor

// Public Courses Routes
router.get("/getAllCourses", getAllCourses)  // Get all courses available for users
router.post("/getCourseDetails/:id", getCourseDetails)  // Get details for a specific course (use GET with an ID parameter)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);



  // Get details for a specific course (use GET with an ID parameter)
 

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
router.get("/getCourseReview", getCourseReview)

module.exports = router