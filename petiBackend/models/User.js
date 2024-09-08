const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber:{
    type:Number,
    trim:true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
    trim:true,
    lowercase:true
  },
  bio:{
    type:String,
    lowercase:true,
    trim:true
  },
  location:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Location",
    trim:true
  },
  profilePicture: {
    type: String,
    default: ""
  },
  coverPicture: {
    type: String,
    default: ""
  },
  verified:{
    type:Boolean,
    default:false
  },
  resetToken:{
    type:String,
    default:""
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  blocklist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
