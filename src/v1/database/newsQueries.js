/**
 * This file contains the Queries used on news items.
 */

const database = require("./databaseConnection");

// Parameter Data should be a json with the information.
const createNews = async (data) => {
    const sql = `
        INSERT INTO news
        (name, description)
        VALUES
        (?, ?)
    `;

    const param = [data.name, data.description];

    try {
        const result = await database.query(sql, param);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createNews,
};
