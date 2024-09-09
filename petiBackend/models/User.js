const mongoose = require("mongoose")

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
    type:String,
    trim:true
  },
  country:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Country"
  },
  state:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"State"
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
  profilePicture: {
    type: String,
    default: ""
  },
  coverPicture: {
    type: String,
    default: ""
  },
  lastLogin:{
    type:Date,
    default:Date.now
  },
  isVerified:{
    type:Boolean,
    default:false
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
  }],
  resetPasswordToken:String,
  resetPasswordExpiresAt:Date,
  verificationToken:String,
  verificationTokenExpiresAt:Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
