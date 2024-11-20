/**
 * This file acts as the routing system for the API
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
