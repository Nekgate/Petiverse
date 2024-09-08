// Initialize the Express app
const express=require("express")
const otpController = require("../otp/otpController");
const { 
  forgotPasswordController
} = require("../controllers/passwordController");

const router=express.Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


// Register
router.post("/register", registerContoller);
// router.post("/request-otp", otpController);

// Login
router.post("/login", async (req, res) => {
  try{
      let user;
      if(req.body.email){
        user=await User.findOne({email:req.body.email})
      }
      else{
        user=await User.findOne({username:req.body.username})
      }

      if(!user){
        return res.status(404).json("User not found!")
      }

      const match=await bcrypt.compare(req.body.password, user.password)

      if(!match){
        return res.status(401).json("Incorrect Password!")
      }
  
      const {password, ...data}=user._doc
      const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
      res.cookie("token", token).status(200).json(data)
  }
  catch(error){
    res.status(500).json(error)
  }
})

// Logout
router.get("/logout", async (req, res) => {
  try{
    res.clearCookie("token", {
      sameSite: "none",
      secure: true
    })
    .status(200)
    .json("User logged out successfully!")
  }
  catch(error){
    res.status(500).json(error)
  }
})

// Fetch Current User
router.get("/refetch", async(req, res) => {
  const token = req.cookies.token
  jwt.verify(token, process.env.JWT_SECRET, async(err, decodedData) => {
    if(err){
      return res.status(401).json({ message: "Invalid or expired token", error: err })
    }
    try{
      const user = await User.findOne({_id: decodedData._id})
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user); 
    } catch(error) {
      res.status(500).json({ message: "Server error", error });
    }
  })
})
// RESET PASSWORD
router.post("/reset-password", forgotPasswordController);
// CONFIRM PASSWORD


module.exports = router