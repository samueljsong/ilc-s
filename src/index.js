const express = require("express");
require("dotenv").config();

//Routers
const v1NewsFeedRouter = require("./v1/routes/NewsFeedRoutes");

const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const expireTime = 60 * 60 * 1000;
const saltRounds = 12;

const app = express();
const PORT = process.env.PORT || 3000;

const corsOption = {
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
            maxAge: expireTime,
            secure: true,
        },
    })
);

app.use("/api/v1/news", v1NewsFeedRouter);
app.use(cors(corsOption));

connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
});
