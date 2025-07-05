const DF = require("../../utils/dateTimeFormatter");
const DB = require("../database/postQueries");
const { post } = require("../routes/PostRoutes");

const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Vancouver", // Use Canada BC timezone
};

const getAllPosts = async () => {
    return await DB.getAllPosts();
};

const getAllRecurringPosts = async () => {
    return await DB.getAllRecurringPosts();
};

const createPost = async (req) => {
    const now = new Date();
    const formattedDateTime = new Intl.DateTimeFormat("en-CA", dateOptions)
        .format(now)
        .replace(",", ""); // Remove comma for SQL format

    console.log(req.body);

    if (req.body.type === "recurring") {
        let recurringData = {
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            event_type: req.body.event_type,
            created_date: new Date(formattedDateTime),
            recurring_detail: req.body.recurring_detail,
        };

        let result =  await DB.createRecurringPost(recurringData);
        let message = (result === 400)
            ? "There was an error in creating recurring event"
            : "Successfully created a recurring event";
        return {status: result, message: message};
    }
    else {
        const data = {
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            event_type: req.body.event_type,
            created_date: req.body.date
        };

        let result = await DB.createPost(data);
        let message = (result === 400)
            ? "There was an error in creating Post"
            : "Successfully created a post"

        return {status: result, message: message};
    }
};

const updatePost = async (req) => {
    let title = req.body.title;
    let body = req.body.body;
    let data = [title, body, req.params.postId];

    let result = await DB.updatePost(data);

    return;
};

const deletePost = async (req) => {
    let result = await DB.deletePost(req.params.postId);
    let message = (result === 400)
        ? "There was an error in deleting the Post"
        : "Successfully deleted a post";

    return {status: result, message: message};
};

module.exports = {
    getAllRecurringPosts,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};
