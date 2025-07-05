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
    const video_id = extractVideoId(data.link);
    data.video_id = video_id;

    data.thumbnail = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;

    const now = new Date();
    const formattedDateTime = new Intl.DateTimeFormat("en-CA", dateOptions)
        .format(now)
        .replace(",", ""); // Remove comma for SQL format
    data.created_date = new Date(formattedDateTime);

    let result = await DB.createVideo(data);
    let message = (result === 400)
        ? "There was an error in creating a video"
        : "Successfully created video";

    return {status: result, message : message};
};

module.exports = {
    getAllVideos,
    createVideo,
};
