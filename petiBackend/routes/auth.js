// Initialize the Express app
const express=require("express")
const otpController = require("../otp/otpController");
const { 
  forgotPasswordController
} = require("../controllers/passwordController");

const router=express.Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { loginController, fetchUserController, logoutController } = require("../controllers/logController");


// Register
router.post("/register", registerContoller);
// router.post("/request-otp", otpController);

// Login
router.post("/login", loginController);

// Logout
router.get("/logout", logoutController);

// Fetch Current User
router.get("/refetch", fetchUserController);
// RESET PASSWORD
router.post("/reset-password", forgotPasswordController);
// CONFIRM PASSWORD


module.exports = router