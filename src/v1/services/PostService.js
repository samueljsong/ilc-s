/**
 * This File is used to house the logic of the API functions.
 */

const DF = require("../../utils/dateTimeFormatter");
const DB = require("../database/postQueries");

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array>} List of all posts.
 */
const getAllPosts = async () => {
    let allPosts = await DB.getAllPosts();
    return allPosts[0];
};

/**
 * Retrieves a specific post by its ID.
 * @param {Object} req - The request object containing the post ID.
 * @returns {Promise<Object>} The requested post.
 */
const getOnePost = async (req) => {
    let data = [req.params.postId];
    return await DB.getPost(data);
};

/**
 * Creates a new post in the database.
 * @param {Object} req - The request object containing the title and body.
 * @returns {Promise<void>} Resolves after the post is created.
 */
const createPost = async (req) => {
    let formattedDate = DF.getDateTime();
    let title = req.body.title;
    let body = req.body.body;

    let data = [title, body, formattedDate];

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
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
};
