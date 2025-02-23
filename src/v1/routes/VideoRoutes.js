const express = require("express");
const router = express.Router();
const VIDEO_CONTROLLER = require("../controllers/VideoController");

router.get("/", VIDEO_CONTROLLER.getAllVideos);

router.post("/", VIDEO_CONTROLLER.createVideo);

module.exports = router;
