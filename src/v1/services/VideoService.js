const DF = require("../../utils/dateTimeFormatter");
const DB = require("../database/videoQueries");

const extractVideoId = (url) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Vancouver", // Use Canada BC timezone
};

const getAllVideos = async () => {
    return await DB.getAllVideos();
};

const createVideo = async (req) => {
    const data = req.body;
    const videoId = extractVideoId(data.link);
    data.video_id = videoId;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    data.thumbnail = thumbnailUrl;

    const now = new Date();
    const formattedDateTime = new Intl.DateTimeFormat("en-CA", dateOptions)
        .format(now)
        .replace(",", ""); // Remove comma for SQL format
    data.createdDate = new Date(formattedDateTime);

    const result = await DB.createVideo(data);
    return result;
};

module.exports = {
    getAllVideos,
    createVideo,
};
