/**
 * @file PostController.js
 * @description This file defines the controller functions for managing post-related routes.
 * It acts as an intermediary between the client requests and the post service layer.
 *
 * @requires ../services/PostService - Handles the business logic for post operations.
 *
 * @author Samuel Song
 * @copyright 2024
 */

const POST_SERVICE = require("../services/PostService");

/**
 * Retrieves and returns all post items in JSON format.
 * @param {Object} req
 * @param {Object} res
 */
const getAllPosts = async (req, res) => {
    let result = await POST_SERVICE.getAllPosts();
    res.json(result);
};

const getAllRecurringPosts = async (req, res) => {
    let result = await POST_SERVICE.getAllRecurringPosts();
    res.json(result);
};

/**
 * Creates a new post item.
 * @param {Object} req
 * @param {Object} res
 */
const createPost = async (req, res) => {
    let result = await POST_SERVICE.createPost(req);
    res.status(result.status).json(result.message);
};

/**
 * Updates an existing post item by ID.
 * @param {Object} req
 * @param {Object} res
 */
const updatePost = async (req, res) => {
    let updatedPost = await POST_SERVICE.updatePost(req);
    res.send("Updating a news item");
};

/**
 * Deletes a specific post item by ID.
 * @param {Object} req
 * @param {Object} res
 */
const deletePost = async (req, res) => {
    let result = await POST_SERVICE.deletePost(req);
    res.status(result.status).json(result.message);
};

module.exports = {
    getAllPosts,
    getAllRecurringPosts,
    createPost,
    updatePost,
    deletePost,
};
