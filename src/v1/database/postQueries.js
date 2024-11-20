/**
 * @file postQueries.js
 * @description This file contains the SQL queries and database interactions for managing news items in the application.
 * The queries interact with the `post` table to perform CRUD operations.
 *
 * @author Samuel Song
 * @requires ./databaseConnection - A configured database connection for executing queries.
 */
const DB = require("./databaseConnection");

/**
 * Inserts a new post into the `post` table.
 *
 * @function createPost
 * @async
 * @param {Object} data - An object containing the post details.
 * @param {string} data.title - The title of the post.
 * @param {string} data.body - The content/body of the post.
 * @param {string} data.date - The date of the post in a valid format (e.g., ISO 8601).
 * @returns {Promise<void>} Resolves when the post is successfully created.
 * @throws Will log an error if the database query fails.
 */
const createPost = async (data) => {
    const SQL = `
        INSERT INTO post
        (title, body, date)
        VALUES
        (?, ?, ?);
    `;

    try {
        await DB.query(SQL, data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Retrieves all posts from the `post` table, sorted by date in descending order.
 *
 * @function getAllPosts
 * @async
 * @returns {Promise<Array>} Resolves with an array of post objects, each containing `title`, `body`, and `date`.
 * @throws Will log an error if the database query fails.
 */
const getAllPosts = async () => {
    const sql = `
        SELECT post_id, title, body, date
        FROM post
        ORDER BY date DESC;
    `;

    try {
        return await DB.query(sql);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Retrieves a specific post by its ID from the `post` table.
 *
 * @function getPost
 * @async
 * @param {Object} data - An object containing the `post_id` for identifying the post.
 * @param {string} data.post_id - The unique identifier for the post to retrieve.
 * @returns {Promise<Object>} Resolves with a post object containing `post_id`, `title`, `body`, and `date`.
 * @throws Will log an error if the database query fails.
 */
const getPost = async (data) => {
    const SQL = `
        SELECT post_id, title, body, date
        FROM post
        WHERE post_id = (?);
    `;

    try {
        return await DB.query(SQL, data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Deletes a post by its ID from the `post` table.
 *
 * @function deletePost
 * @async
 * @param {Object} data - An object containing the `post_id` for identifying the post to delete.
 * @param {string} data.post_id - The unique identifier for the post to delete.
 * @returns {Promise<void>} Resolves when the post is successfully deleted.
 * @throws Will log an error if the database query fails.
 */
const deletePost = async (data) => {
    const SQL = `
        DELETE FROM post WHERE post_id = (?);
    `;

    try {
        return await DB.query(SQL, data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Updates a specific post by its ID in the `post` table.
 *
 * @function updatePost
 * @async
 * @param {Object} data - An object containing the updated post details and `post_id`.
 * @param {string} data.title - The updated title of the post.
 * @param {string} data.body - The updated content/body of the post.
 * @param {string} data.post_id - The unique identifier for the post to update.
 * @returns {Promise<void>} Resolves when the post is successfully updated.
 * @throws Will log an error if the database query fails.
 */
const updatePost = async (data) => {
    const SQL = `
        UPDATE post
        SET title = (?), body = (?)
        WHERE post_id = (?);
    `;

    try {
        return await DB.query(SQL, data);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    getPost,
    updatePost,
};
