// Initialize the Express app
const express=require("express")
// initialize the cors to allow cross origin
const cors = require("cors");
// importing allowed site to utilize the api
const corsAllowed = require('./middlewares/corsAllow');

// Import the connectDB function from the database configuration file to establish a MongoDB connection
const connectDB = require("./database/db")

// Initialize the Express app
const app=express()

// Import the dotenv module to load environment variables from a .env file into process.env
const dotenv=require("dotenv")

// Load environment variables from the .env file
dotenv.config()

// allowing coors for all routes
app.use(cors(corsAllowed));


// Start the Express server and listen on the port defined in the environment variables (PORT)
// The connectDB function is called to establish a database connection once the server starts
app.listen(process.env.PORT,()=>{
  connectDB()
  console.log("app is running")  // Log a message indicating the server is running
})