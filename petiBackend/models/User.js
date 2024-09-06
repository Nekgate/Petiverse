const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true
  },
  fullName:{
    type:String,
    required:true,
    trim:true
  },
  location:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Location"
  },
  phoneNumber:{
    type:Number,
    required:true,
    trim:true
  },
  bio:{
    type:String,
    required:true
  },
  profilePicture:{
    type:String,
    default:""
  },
  coverPicture:{
    type:String,
    default:""
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  }],
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  following:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  blocklist:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User