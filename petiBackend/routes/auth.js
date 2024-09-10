// Initialize the Express app
const express=require("express")
const router=express.Router();
const { loginController, fetchUserController, logoutController } = require("../authControllers/loggingController");
const { registerContoller } = require("../authControllers/registerController");
const { verifyEmailController } = require("../authControllers/verifyEmailController");
const forgotPasswordController = require("../authControllers/forgotPasswordController");
const changePasswordController = require("../authControllers/changePasswordController");




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
router.post("/forgot-password", forgotPasswordController);

// RESET PASSWORD WITH TOKEN
router.post("/reset-password/:token", changePasswordController);


module.exports = router