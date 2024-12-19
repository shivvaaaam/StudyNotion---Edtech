const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		const url = `https://studynotion-edtech-e3nq.onrender.com/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};
//reset Password

exports.resetPassword = async(req,res) =>{

    try {
        const {password, confirmPassword, token} = req.body;

    if(password !== confirmPassword){
        res.json({
            success:false,
            message:"Password dont match, Please try again",
        });
    }

    const userDetails = await User.findOne({token: token});

    if(!userDetails){
        return res.json({
            success:false,
            message: "Invalid token",
        });
    }

    if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token has been expired, Please Re-generate",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

     await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
     )

     return res.status(200).json({
        success:true,
        message: "Password reset successfully",
     });

    } catch (error) {
        console.log(error);
        res.status(500).json({
             success:false,
             message: "Something went wrong while updating reset password",
        });
    }
}