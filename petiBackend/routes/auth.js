// Initialize the Express app
const express=require("express")
const { 
  forgotPasswordController,
  verifyTokenPasswordController,
  resetPasswordController,
} = require("../controllers/passwordController");

const router=express.Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { loginController, fetchUserController, logoutController } = require("../controllers/logController");
const { registerContoller } = require("../controllers/authController");


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

// VERIFY TOKEN PASSWORD
router.post("/verify-token", verifyTokenPasswordController);

// CHANGE PASSWORD
router.post("/change-password", resetPasswordController);


module.exports = router