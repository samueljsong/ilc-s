/**
 * @file NewsFeedRoutes.js
 * @description This file defines the routing layer for news feed operations.
 * It connects HTTP endpoints to their corresponding controller functions in the NewsFeedController.
 *
 * @requires express - The Express library for creating and handling routes.
 * @requires ../controllers/NewsFeedController - Contains route handlers that call the NewsFeedService for business logic.
 *
 * @author Samuel Song
 * @copyright 2024
 */

const express = require("express");
const router = express.Router();
const newsFeedController = require("../controllers/NewsFeedController");

// Route for getAllNews.
router.get("/", newsFeedController.getAllNews);

// Route for getOneNews.
router.get("/:newsId", newsFeedController.getOneNews);

// Route for createNewNews.
router.post("/", newsFeedController.createNewNews);

// Route for updateOneNews.
router.patch("/:newsId", newsFeedController.updateOneNews);

// Route for deleteOneNews
router.delete("/:newsId", newsFeedController.deleteOneNews);

module.exports = router;
