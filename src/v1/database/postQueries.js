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
const createRecurringPost = async (data) => {
    const SQL = `
        INSERT INTO recurringEvent
        (title, description, image_url, eventType, createdDate, recurringDetail)
        VALUES
        (?, ?, ?, ?, ?, ?);
    `;

    try {
        const result = {
            status: 200,
            message: "Recurring post has been created successfully!",
        };
        await DB.query(SQL, Object.values(data));
        return result;
    } catch (err) {
        const result = {
            status: 500,
            message: "Recurring post creation failed!",
        };
        return result;
    }
};

const createPost = async (data) => {
    const SQL = `
        INSERT INTO event
        (title, description, image_url, eventType, createdDate, expirationDate)
        VALUES
        (?, ?, ?, ?, ?, ?);
    `;

    try {
        const result = {
            status: 200,
            message: "Post has been created successfully!",
        };
        await DB.query(SQL, Object.values(data));
        return result;
    } catch (err) {
        const result = {
            status: 500,
            message: "Post creation failed!",
        };
        return result;
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
        SELECT * FROM event
        ORDER BY expirationDate ASC;
    `;

    try {
        const res = await DB.query(sql);
        return res[0];
    } catch (err) {
        console.log(err);
    }
};

const getAllRecurringPosts = async () => {
    const sql = `
        SELECT * FROM recurringEvent
        ORDER BY createdDate DESC;
    `;

    try {
        const res = await DB.query(sql);
        return res[0];
    } catch {
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
    getAllRecurringPosts,
    deletePost,
    updatePost,
    createRecurringPost,
};
