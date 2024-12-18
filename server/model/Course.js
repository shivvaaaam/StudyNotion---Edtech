
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }
  ],
    ratingAndReviews:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ratings"
     }
    ],

    price:{
       type:Number,
    },
    thumbnail:{
       type:String,
       required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },

    ],
    createdAt: {
		type:Date,
		default:Date.now
	},

});

module.exports = mongoose.model("Course", courseSchema);