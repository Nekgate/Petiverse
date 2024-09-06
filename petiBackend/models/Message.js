// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose")

// Define the schema for a message
const messageSchema = new mongoose.Schema({
  // Reference to the conversation this message belongs to
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,  // The type is ObjectId, which references a Conversation
    ref: "Conversation",
    required: true  // The conversationId field is required
  },
  // Reference to the user who sent the message
  sender: {
    type: mongoose.Schema.Types.ObjectId,  // The type is ObjectId, which references a User
    ref: "User",
    required: true  // The sender field is required
  },
  // The text content of the message
  text: {
    type: String,
    required: true
  }
},{timestamps: true})  // Automatically adds createdAt and updatedAt timestamps

// Create a Mongoose model for the Message schema
const Message = mongoose.model("Message",messageSchema)

// Export the Message model for use in other parts of the application
module.exports = Message
