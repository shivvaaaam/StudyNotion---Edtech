const jwt = require('jsonwebtoken');
const User = require("../model/User");
require('dotenv').config();




exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Authorization Header:", req.header("Authorization"));  // Log to verify header content

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);  // Log decoded token for verification
      req.user = decoded;
    } catch (error) {
      console.log("Token Verification Error:", error);  // Log error if verification fails
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);  // Log any other errors
    res.status(401).json({
      success: false,
      message: "Something went wrong while validating token",
    });
  }
};



//for student

exports.isStudent = async (req, res, next) =>{
    
    try {

        if(req.user.accountType !== "Student"){
             res.status(401).json({
                success:false,
                message: "This is a protected route for Students only",
             });
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             success:false,
             message: "User role cannot be verified, Please try again",
        });
        
    }

}


//for instructor

exports.isInstructor = async(req,res,next) =>{
   
    try {
        if(req.user.accountType !== "Instructor"){
            res.status(401).json({
                success:false,
                message: "This is a protected route for Instructor only",
             });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
             success:false,
             message: "User role cannot be verified, Please try again",
        });
    }
    
}

//for admin

exports.isAdmin = async(req, res, next) =>{

    try {
        if(req.user.accountType !== "Admin"){
            res.status(401).json({
                success:false,
                message: "This is a protected route for Admin only",
             });
        }
        next();

    } catch (error) {
         console.log(error);
        res.status(500).json({
             success:false,
             message: "User role cannot be verified, Please try again",
        });
    }
}

