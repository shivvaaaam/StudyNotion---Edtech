require('dotenv').config();
const mongoose = require('mongoose');

exports.dbconnect = () =>{
    mongoose.connect(process.env.MONGO_URL)

    .then(() => console.log("Successfully connect to MongoDb"))
    .catch((error)=> {
        console.log("Something went wrong while connecting to MongoDb");
        console.error(error);
        process.exit(1);
    }) 
}