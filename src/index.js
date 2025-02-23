const express = require("express");
require("dotenv").config();

//Routers
const V1_POST_ROUTER = require("./v1/routes/PostRoutes");
const V1_VIDEO_ROUTER = require("./v1/routes/VideoRoutes");

const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const EXPIRE_TIME = 60 * 60 * 1000;
const SALT_ROUNDS = 12;

const app = express();
const PORT = process.env.PORT || 3000;

const CORS_OPTION = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(CORS_OPTION)); //has to be done before the app.use session

app.use(
    session({
        secret: process.env.NODE_SECRET_SESSION,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            crypto: { secret: process.env.MONGO_SESSION_SECRET },
            collectionName: "sessions",
        }),
        saveUninitialized: false,
        resave: true,
        cookie: {
            maxAge: EXPIRE_TIME,
            secure: true,
        },
    })
);

// app.options("*", cors(CORS_OPTION));
//Middleware
app.use("/api/v1/post", V1_POST_ROUTER);
app.use("/api/v1/video", V1_VIDEO_ROUTER);

connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
});
