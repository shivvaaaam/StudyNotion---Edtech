const User = require("../model/User");
const OTP = require('../model/Otp');
const otpGenerator = require('otp-generator');
const Profile = require("../model/Profile");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.sendotp = async(req,  res) => {

   try {
        
         const {email} = req.body;
     
         const checkUserPresent = await User.findOne({email});

         if(checkUserPresent){
            res.status(401).json({
                success:false,
                message: "Email already exist",
            });
         }

         var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })
        console.log("generated otp ->", otp);
        
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
             })
             result = await OTP.findOne({otp:otp});    
        }

       const otpPayload = {email, otp};

       const otpBody = await OTP.create(otpPayload);
       console.log(otpBody);

       res.status(200).json({
         success:true,
         message:"Otp sent successfully",
         otp,
       })
        
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error while generating otp",
        });
    }

}

//signup

// Signup Function
exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}
 
		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};


//login


exports.login = async(req, res) =>{
   
   try {
    const {email, password} = req.body;
    
    if(!email || ! password){
       return res.status(403).json({
        success:false,
        message: "Please fill all your credentials",
       });
    }

    const user = await User.findOne({email}).populate("additionalDetails");

    if(!user){
      return res.status(401).json({
        success:false,
        message: "User not found, Please register your email",
      });
    }
    
    
    if(await bcrypt.compare(password, user.password)){
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,

      }
      const token = jwt.sign(payload, process.env.JWT_SECRET,{
          expiresIn:"2h",
        });

        user.token = token;
        user.password = undefined;

        const option = {
          expires: new Date(Date.now() + 3*24*60*60*1000),
          httpOnly:true,
        }

        res.cookie("token", token, option).status(200).json({
          success:true,
          token,
          user,
          message: "Logged in Successfully",
        });

    }else{
      return res.status(401).json({
          success:false,
          message: "Incorrect Password",

       });
    }

   } catch (error) {
       console.log(error);
       res.status(500).json({
         success: false,
         message: "Login failure, Please try again",

       });

   }
}

//change password

exports.changePassword = async (req, res) => {
  const { password, confirmPassword, email } = req.body;

  // Check if all required fields are provided
  if (!password || !confirmPassword) {
      return res.status(403).json({
          success: false,
          message: "Please fill all the credentials",
      });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
      return res.status(401).json({
          success: false,
          message: "Passwords don't match, please try again",
      });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      // Check if the new password is the same as the current password
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
          return res.status(401).json({
              success: false,
              message: "Previous passwords cannot be used again, try something else",
          });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();

      // Send success response
      return res.status(200).json({
          success: true,
          message: "Password changed successfully",
      });

  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Something went wrong, please try again later",
      });
  }
};
