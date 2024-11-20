/**
 * This file controls what services should be executed when the Client utilizes a specific route.
 */

const POST_SERVICE = require("../services/PostService");

const getAllPosts = async (req, res) => {
    let allPosts = await POST_SERVICE.getAllPosts();

    res.json({
        allPosts: allPosts,
    });
};

const getPost = async (req, res) => {
    let newsItem = POST_SERVICE.getOnePost(req);
    res.send("Get an existing news item");
};

const createPost = async (req, res) => {
    let result = await POST_SERVICE.createPost(req);
    res.send("Creating a news item");
};

const updatePost = async (req, res) => {
    let updatedPost = await POST_SERVICE.updatePost(req);
    res.send("Updating a news item");
};

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
