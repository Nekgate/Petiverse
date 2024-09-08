// Initialize the Express app
const express=require("express")
// initialize the cors to allow cross origin
const cors = require("cors");
// importing allowed site to utilize the api
const corsAllowed = require('./middlewares/corsAllow');

// Import the connectDB function from the database configuration file to establish a MongoDB connection
const connectDB = require("./database/db")

// importing customError and errorHandler
const { CustomError, errorHandler } = require('./middlewares/error');

// Initialize the Express app
const app=express()

// Import the dotenv module to load environment variables from a .env file into process.env
const dotenv=require("dotenv")

// Import cookieParser to handle cookies
const cookieParser = require('cookie-parser');

// importing routes
const authRoute=require("./routes/auth")

// Load environment variables from the .env file
dotenv.config()

// Use cookieParser to allow the app to handle cookies
app.use(cookieParser());

// allowing cors for all routes
app.use(cors(corsAllowed));

// Allow the app to parse JSON payloads
app.use(express.json());

// Allow the app to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

// use authentication routes
app.use("/api/v1/auth",authRoute)

// instantiationg errorHandler to app
app.use(errorHandler);

// import port
const port = process.env.PORT || 5000;

// Start the Express server and listen on the port defined in the environment variables (PORT)
// The connectDB function is called to establish a database connection once the server starts
// app.listen(port,()=>{
//   connectDB()
//   console.log("app is running")  // Log a message indicating the server is running
// })

// Connect to the database and then start the server
connectDB()
    .then(() => {
        // Start the server after a successful database connection
        app.listen(port, () => {
            console.log("App is running on port"); // Log a message indicating the server is running
        });
    })
    .catch((error) => {
        // Handle any errors during the database connection
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with a failure code
    });