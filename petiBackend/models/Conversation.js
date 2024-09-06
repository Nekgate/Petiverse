// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose")

// Define the schema for a conversation
const conversationSchema = new mongoose.Schema({
  // Array of participants in the conversation, each being a reference to a User model
  participants: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true  // The participants field is required
  }]
},{timestamps: true})  // Automatically adds createdAt and updatedAt timestamps

// Create a Mongoose model for the Conversation schema
const Converstation = mongoose.model("Conversation",conversationSchema)

// Export the Conversation model for use in other parts of the application
module.exports = Conversation