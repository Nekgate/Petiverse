// Initialize the Express app
const express=require("express")

// Import the connectDB function from the database configuration file to establish a MongoDB connection
const connectDB = require("./database/db")

// Initialize the Express app
const app=express()

// Import the dotenv module to load environment variables from a .env file into process.env
const dotenv=require("dotenv")
const authRoute=require("./routes/auth")

// Load environment variables from the .env file
dotenv.config()
app.use("/api/auth",authRoute)


// Start the Express server and listen on the port defined in the environment variables (PORT)
// The connectDB function is called to establish a database connection once the server starts
app.listen(5000,()=>{
  connectDB()
  console.log("app is running")  // Log a message indicating the server is running
})