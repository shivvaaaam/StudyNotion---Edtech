const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    course: {  // Add this to the schema
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",  // Reference to the Course model
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Ratings", ratingSchema);
