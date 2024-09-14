const express = require('express');  // Import Express framework
const router = express.Router();  // Create a new router object
const upload = require('../middlewares/multerConfig'); // calling multer config  function
const verifyToken = require('../middlewares/verifyToken');


// CREATE POST WITH IMAGE
// The `createPostWithImagesController` handles the logic for creating the post with image
router.post("/create/:userId", multiple, createPostWithImagesController);


// CREATE POST
router.post("/create", verifyToken, createPostController);

// CREATE POST WITH IMAGE
// upload.array indicate images to be uploaded and it should be maximum of five
router.post("/create/:userId", upload.array("images",5),createPostWithImageController);

// UPDATE POST
router.put("/update/:postId", updatePostController);

// GET ALL POSTS
router.get("/all/:userId", getPostsController);

// GET USER POSTS
router.get("/user/:userId", getUserPostsController);

// DELETE A POST
router.delete("/delete/:postId", deletePostController);

// LIKE POST
router.post("/like/:postId", likePostController);

// UNLIKE POST
router.post("/dislike/:postId", dislikePostController);


module.exports = router