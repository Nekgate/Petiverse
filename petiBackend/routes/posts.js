const express = require('express');  // Import Express framework
const router = express.Router();  // Create a new router object
const { single, multiple } = require("../middlewares/multerConfig");  // Import multer config
const { createPostController, createPostWithImagesController } = require("../postControllers/postControllers")


// CREATE POST
// The `createPostController` handles the logic for creating the post
router.post("/create", createPostController);

// CREATE POST WITH IMAGE
// The `createPostWithImagesController` handles the logic for creating the post with image
router.post("/create/:userId", multiple, createPostWithImagesController);

module.exports = router