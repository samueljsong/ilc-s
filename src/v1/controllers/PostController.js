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
    let allPosts = await POST_SERVICE.getAllPosts();

    res.json({
        allPosts: allPosts,
    });
};

/**
 * Retrieves and returns a specific post item by ID in JSON format.
 * @param {Object} req
 * @param {Object} res
 */
const getPost = async (req, res) => {
    let newsItem = POST_SERVICE.getOnePost(req);
    res.send("Get an existing news item");
};

/**
 * Creates a new post item.
 * @param {Object} req
 * @param {Object} res
 */
const createPost = async (req, res) => {
    let result = await POST_SERVICE.createPost(req);
    res.send("Creating a news item");
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
    let deletedPost = await POST_SERVICE.deletePost(req);
    res.send("Delete an existing news item");
};

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
};
