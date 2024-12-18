const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({

    email:{
       type: String,
       required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

async function verificationMail(email,otp) {
    try {

        const mailResponse = await mailSender(email, "Verification code from StudyNotion", otp);
        console.log("Verification mail sent successfully", mailResponse);
        
        
    } catch (error) {
        console.log("Somthing went wrong while sending verification otp", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next){
    await verificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otpSchema);