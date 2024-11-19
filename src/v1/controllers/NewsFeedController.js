/**
 * This file controls what services should be executed when the Client utilizes a specific route.
 */

const newsFeedService = require("../services/NewsFeedService");

const getAllNews = (req, res) => {
    const allNews = newsFeedService.getAllNews();
    res.send("Get all news");
};

const getOneNews = (req, res) => {
    const newsItem = newsFeedService.getOneNews();
    res.send("Get an existing news item");
};

const createNewNews = (req, res) => {
    const createdNews = newsFeedService.createNewNews();
    res.send("Creating a news item");
};

const updateOneNews = (req, res) => {
    const updatedNews = newsFeedService.updateOneNews();
    res.send("Updating a news item");
};

const deleteOneNews = (req, res) => {
    const deletedNews = newsFeedService.deleteOneNews();
    res.send("Delete an existing news item");
};

module.exports = {
    getAllNews,
    getOneNews,
    createNewNews,
    updateOneNews,
    deleteOneNews,
};
