/**
 * This File is used to house the logic of the API functions.
 */

const DF = require("../../utils/dateTimeFormatter");
const DB = require("../database/postQueries");

const getAllPosts = async () => {
    let allPosts = await DB.getAllPosts();
    return allPosts[0];
};

const getOnePost = async () => {
    return;
};

const createPost = async (req) => {
    let formattedDate = DF.getDateTime();
    let title = req.body.title;
    let body = req.body.body;

    let data = [title, body, formattedDate];

    let result = await DB.createPost(data);
    return result;
};

const updatePost = async () => {
    return;
};

const deletePost = async () => {
    return;
};

module.exports = {
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
};
