// Initialize the Express app
const express=require("express")
const router=express.Router()
const User=require("../models/User")


// Register
router.post("/register",async (req,res)=>{
  try{
    const newUser = new User ({
      username: "gizmo",
      email: "gizmodoe@gmail.com",
      password: "123456",
      fullname: "Gizmo Doe",
      bio: "Hey there! this is gizmo"
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
    
  }
  catch(error){
    res.status(500).json(error)
  }
})

// Login


// Logout


// Fetch Current User


module.exports = router