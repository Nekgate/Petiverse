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
app.use(express.urlencoded({ extended: true }));

// use authentication routes
app.use("/v1/api/auth",authRoute)

// instantiationg errorHandler to app
app.use(errorHandler);



// Start the Express server and listen on the port defined in the environment variables (PORT)
// The connectDB function is called to establish a database connection once the server starts
app.listen(5000,()=>{
  connectDB()
  console.log("app is running")  // Log a message indicating the server is running
})