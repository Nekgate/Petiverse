const fs = require('fs');
const Post = require("../models/Post");  // Import the Post model
const User = require("../models/User");  // Import the User model
// Import CustomError for handling application-specific errors
const {CustomError} = require("../middlewares/error");
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables

/**
 * Controller for creating a new post
 * @param {Object} req - Express request object, containing userId and caption in req.body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

const createPostController = async(req, res, next) => {
  const {userId, caption} = req.body;  // Extract userId and caption from the request body
  try{
    const user = await User.findById(userId);  // Find the user by userId
    if(!user){
      // If user is not found, throw a CustomError with a 404 status
      throw new CustomError("User not found!", 404);
    }
    const newPost = new Post ({
      user: userId,
      caption
    });

    await newPost.save()
    user.posts.push(newPost._id)
    await user.save()
    res.status(201).json({message: "Post created succesfully!.", post:newPost})
  }
  catch(error) {
    next(error);
  }
}

/**
 * Uploads a file to Cloudinary and deletes the local file after successful upload.
 * @param {string} filePath - The local file path.
 * @returns {Promise<string>} - The Cloudinary secure URL of the uploaded image.
 */

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "posts", // Auto create and save in cloudianry folder
    });
    fs.unlinkSync(filePath); // Remove the local file after upload
    return result.secure_url;
  } catch (error) {
    throw new Error("Image upload to Cloudinary failed");
  }
};

const createPostWithImagesController = async(req, res, next) => {
  const {userId} = req.params;
  const {caption} = req.body;
  const files = req.files;

  try{
      const user = await User.findById(userId);
     if(!user){
      throw new CustomError("User not found!", 404);
     }
    
    // Validate that files exist and check for image type
    if (!files || files.length === 0) {
      throw new CustomError("No files uploaded!", 400);
    }
     
     // Upload images to Cloudinary
     const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.path))
    );

    // Create new post with image URLs
    const newPost = new Post({
      user: userId,
      caption,
      images: imageUrls, // Storing Cloudinary URLs
    });

     await newPost.save()
     user.posts.push(newPost._id)
     await user.save()

     res.status(201).json({ message: "Post created successfully!", post: newPost });
  }
  catch(error){
      next(error)
  }

}

module.exports = {createPostController, createPostWithImagesController} // Export the controller function
