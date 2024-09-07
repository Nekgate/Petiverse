// Import the mongoose library to interact with MongoDB
const mongoose=require("mongoose")

// Define an asynchronous function to connect to the MongoDB database
const connectDB= async ()=>{
    try{
      // Connect to the MongoDB database using the connection string stored in environment variable
       await mongoose.connect(process.env.MONGO_URL, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000,
      });
       console.log("database connected successfully!")  // Log success message if connection is successful
    }
    catch(error){
      // Log error message if the connection fails
       console.log("database is not connected! "+error)
    }
}

// Export the connectDB function to be used in other parts of the application
module.exports=connectDB