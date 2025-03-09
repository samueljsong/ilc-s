/**
 * @file NewsFeedService.js
 * @description This file defines handles the business logic for the post operation.
 *
 * @author Samuel Song
 * @copyright 2024
 */

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

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array>} List of all posts.
 */
const getAllPosts = async () => {
    let results = await DB.getAllPosts();

    results = results.filter((post) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        return post.expirationDate >= today;
    });

    return results;
};

const getAllRecurringPosts = async () => {
    let results = await DB.getAllRecurringPosts();
    return results;
};

/**
 * Creates a new post in the database.
 * @param {Object} req - The request object containing the title and body.
 * @returns {Promise<void>} Resolves after the post is created.
 */
const createPost = async (req) => {
    const now = new Date();
    const formattedDateTime = new Intl.DateTimeFormat("en-CA", dateOptions)
        .format(now)
        .replace(",", ""); // Remove comma for SQL format

    const recurringData = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.thumbnail,
        eventType: req.body.type,
        createdDate: new Date(formattedDateTime),
        recurringDetail: req.body.recurringDetails,
    };

    if (req.body.type === "recurring") {
        let result = await DB.createRecurringPost(recurringData);
        return result;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.thumbnail,
        eventType: req.body.type,
        createdDate: new Date(formattedDateTime),
        expirationDate: req.body.date,
    };

    let result = await DB.createPost(data);
    return result;
};

/**
 * Updates an existing post in the database.
 * @param {Object} req - The request object containing the updated title, body, and post ID.
 * @returns {Promise<void>} Resolves after the post is updated.
 */
const updatePost = async (req) => {
    let title = req.body.title;
    let body = req.body.body;
    let data = [title, body, req.params.postId];

    let result = await DB.updatePost(data);

    return;
};

/**
 * Deletes a post by its ID.
 * @param {Object} req - The request object containing the post ID.
 * @returns {Promise<void>} Resolves after the post is deleted.
 */
const deletePost = async (req) => {
    let data = [req.params.postId];
    let result = await DB.deletePost(data);
    console.log(result);
    return;
};

module.exports = {
    getAllRecurringPosts,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};
