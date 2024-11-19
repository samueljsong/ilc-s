const express = require("express");

//Routers
const v1NewsFeedRouter = require("./v1/routes/NewsFeedRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use("/api/v1/news", v1NewsFeedRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
