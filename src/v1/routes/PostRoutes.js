/**
 * @file PostRoutes.js
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
const POST_CONTROLLER = require("../controllers/PostController");

/**
 *
 */
router.get("/", POST_CONTROLLER.getAllPosts);

router.get("/:postId", POST_CONTROLLER.getPost);

router.post("/", POST_CONTROLLER.createPost);

router.patch("/:postId", POST_CONTROLLER.updatePost);

router.delete("/:postId", POST_CONTROLLER.deletePost);

module.exports = router;
