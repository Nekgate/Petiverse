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
const { verifyEmailController } = require("../controllers/verifyEmailController");


// Register
router.post("/register", registerContoller);

// VERIFY USER AFTER REGISTRATION
router.post("/verify-email", verifyEmailController);

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