// In your index.js
const express = require('express');
const app = express();

const courseRoute = require('./routes/Course');
const paymentRoute = require('./routes/Payments');
const profileRoute = require('./routes/Profile');
const userRoute = require('./routes/User');
const categoryRoute = require('./routes/Category');  // Import the new category route

const database = require('./config/dataBase');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { cloudinaryConnects } = require("./config/Cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.dbconnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

cloudinaryConnects();

// Use the new category route
app.use("/api/v1/category", categoryRoute);

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", userRoute);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server Established"
    });
});

app.listen(PORT, () => {
    console.log(`App activated at port ${PORT}`);
});
