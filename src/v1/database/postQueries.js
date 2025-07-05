const SUPABASE = require("./databaseConnection");

const createRecurringPost = async (recurringEventData) => {
    const { data, error } = await SUPABASE
        .from('recurring_event')
        .insert([recurringEventData])

    if (error) {
        console.log(error);
        return 400;
    }

    return 200;
};

const createPost = async (eventData) => {
    const { data, error } = await SUPABASE
        .from('event')
        .insert([eventData])

    if (error) {
        console.log(error);
        return 400;
    }

    return 200;
};

const getAllPosts = async () => {
    const today = new Date().toISOString();

    const { data, error } = await SUPABASE
        .from('event')
        .select('*')
        .gt('created_date', today)
        .order('created_date', {ascending: false});

    if (error) {
        console.log(error.message);
    }

    return data;
};

const getAllRecurringPosts = async () => {
    const { data, error } = await SUPABASE
        .from('recurring_event')
        .select('*');

    if (error) {
        console.log(error.message);
    }

    return data;
};

const deletePost = async (eventData) => {
    const { data, error } = await SUPABASE
        .from('event')
        .delete()
        .eq('event_id', eventData)

    if (error) {
        console.log(error);
        return 400;
    }

    return 200;
};

const updatePost = async (data) => {

};

module.exports = {
    createPost,
    getAllPosts,
    getAllRecurringPosts,
    deletePost,
    updatePost,
    createRecurringPost,
};
