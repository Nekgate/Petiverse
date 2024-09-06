// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose")

// Define the schema for a comment
// Reference to the user who created the comment (User model)
const commentSchema=new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  // Reference to the post this comment belongs to (Post model)
  post: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:true
  },
  // The text content of the comment
  text: {
    type:String,
    required:true,
    trim:true  // Trims whitespace around the text
  },
  // Array of users (ObjectId) who liked the comment
  likes: [{
    types:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  // Nested array of replies, each reply has its own user, text, likes, and creation date
  replies: [{
    // The user who replied
    users:{
      types:mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required:true
    },
    // The text content of the reply
    text: {
      type:String,
      required:true,
      trim:true
    },
    // Array of users who liked the reply
    likes: [{
      types:mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    // Timestamp of when the comment was created
    createdAT: {
      type:Date,
      default: Date.now
    }
  }],
  // Timestamp of when the comment was created
  createdAT: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model("Comment",commentSchema)

module.exports = Comment