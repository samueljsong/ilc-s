const SUPABASE = require("./databaseConnection");

const createVideo = async (videoData) => {
    const { data, error } = await SUPABASE
        .from('video')
        .insert([videoData])

    if (error) {
        console.log(error);
        return 400;
    }

    return 200;
};

const getAllVideos = async () => {
    const { data, error } = await SUPABASE
        .from('video')
        .select('*')
        .order('date', {ascending: false});

    if (error) console.log(error);

    return data;
};

module.exports = {
    createVideo,
    getAllVideos,
};
