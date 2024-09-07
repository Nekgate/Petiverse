// Initialize the Express app
const express=require("express");
const {
  registerContoller
} = require("../controllers/authController");
const router=express.Router()

// Register
router.post("/register", registerContoller);

// Login


// Logout


// Fetch Current User


module.exports = router