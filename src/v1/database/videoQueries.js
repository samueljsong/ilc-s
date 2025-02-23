const DB = require("./databaseConnection");

const createVideo = async (data) => {
    const SQL = `INSERT INTO video (type, date, title, description, link, createdDate, thumbnail)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

    try {
        return await DB.query(SQL, Object.values(data));
    } catch (err) {
        console.log(err);
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
