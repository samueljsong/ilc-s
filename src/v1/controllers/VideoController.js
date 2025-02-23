const VIDEO_SERVICE = require("../services/VideoService");

const getAllVideos = async (req, res) => {
    let result = await VIDEO_SERVICE.getAllVideos();
    res.json(result);
};

const createVideo = async (req, res) => {
    VIDEO_SERVICE.createVideo(req);
};

module.exports = {
    getAllVideos,
    createVideo,
};
