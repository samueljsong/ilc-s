/**
 * This file acts as the routing system for the API
 */

const express = require("express");
const router = express.Router();
const newsFeedController = require("../controllers/NewsFeedController");

/**
 *
 */
router.get("/", newsFeedController.getAllNews);

router.get("/:newsId", newsFeedController.getOneNews);

router.post("/", newsFeedController.createNewNews);

router.patch("/:newsId", newsFeedController.updateOneNews);

router.delete("/:newsId", newsFeedController.deleteOneNews);

module.exports = router;
