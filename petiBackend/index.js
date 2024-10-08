const express=require("express");
const connectDB = require("./database/db");
const app=express();
const dotenv=require("dotenv");
const cors = require('cors');
const corsAllowed = require('./middlewares/corsAllow');
const cookieParser=require("cookie-parser");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");
const commentRoute=require('./routes/comment');
const storyRoute=require("./routes/story");
const chatRoute=require("./routes/chat");
const postRoute=require("./routes/posts");
const http = require('http');
const messageRoute=require("./routes/message");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { setupSocket } = require('./utils/socketIOConfig');
const { errorHandler, CustomError } = require("./middlewares/error");
const { initRedisClient } = require("./utils/redisConfig");


dotenv.config()

// instantiating app to socketio setup
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server);

// Use cookieParser to allow the app to handle cookies
app.use(cookieParser());

// allowing cors for all routes
app.use(cors(corsAllowed));

// Allow the app to parse JSON payloads
app.use(express.json());

// Allow the app to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Load Swagger document
const swaggerDocument = require(path.join(__dirname, 'docs', 'swagger.json'));

// Serve Swagger UI at /api-docs
app.use('/petiverse-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// use authentication routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/story", storyRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/post", postRoute);

// instantiating errorHandler to app
app.use(errorHandler);

// import port
const port = process.env.PORT || 5000;

// Connect to the database, redis and then start the server
connectDB()
    .then(() => {
        // wait for the redis to connect
        initRedisClient();
        // Start the server after a successful database connection
        server.listen(port, () => {
            console.log("App is running on port"); // Log a message indicating the server is running
        });
    })
    .catch((error) => {
        // Handle any errors during the database connection
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with a failure code
    });