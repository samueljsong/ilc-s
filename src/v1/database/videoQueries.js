const DB = require("./databaseConnection");

const createVideo = async (data) => {
    const SQL = `INSERT INTO video (video_id, type, date, title, description, link, createdDate, thumbnail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    try {
        const result = {
            status: 200,
            message: "Video has been created successfully!",
        };
        await DB.query(SQL, Object.values(data));
        return result;
    } catch (err) {
        const result = {
            status: 500,
            message: "Video creation failed!",
        };
        return result;
    }
};

const getAllVideos = async () => {
    const SQL = `SELECT * FROM video
                 ORDER BY createdDate DESC;`;

    try {
        const res = await DB.query(SQL);
        return res[0];
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createVideo,
    getAllVideos,
};
