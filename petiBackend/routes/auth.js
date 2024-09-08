// Initialize the Express app
const express=require("express");
const {
  registerContoller
} = require("../controllers/authController");
const otpController = require("../otp/otpController");
const { 
  forgotPasswordController
} = require("../controllers/passwordController");

const router=express.Router()

// Register
router.post("/register", registerContoller);
// router.post("/request-otp", otpController);

// Login


// Logout


// Fetch Current User

// RESET PASSWORD
router.post("/reset-password", forgotPasswordController);
// CONFIRM PASSWORD


module.exports = router