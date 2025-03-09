const VIDEO_SERVICE = require("../services/VideoService");

const getAllVideos = async (req, res) => {
    let result = await VIDEO_SERVICE.getAllVideos();
    res.json(result);
};

const createVideo = async (req, res) => {
    let result = await VIDEO_SERVICE.createVideo(req);
    res.status(result.status).json(result);
};

module.exports = {
    getAllVideos,
    createVideo,
};
