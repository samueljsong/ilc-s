const getDateTime = () => {
    const date = new Date();
    // Get the UTC timestamp and adjust for PST (UTC-8 or UTC-7 for daylight saving time)
    const offsetInMilliseconds = 8 * 60 * 60 * 1000; // PST is UTC-8
    const pstDate = new Date(date.getTime() - offsetInMilliseconds);
    const formattedDate = pstDate.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};

module.exports = {
    getDateTime,
};
