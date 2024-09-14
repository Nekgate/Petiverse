const express = require('express');  // Import Express framework
const router = express.Router();  // Create a new router object
const upload = require('../middlewares/multerConfig'); // calling multer config  function
const verifyToken = require('../middlewares/verifyToken');
const { 
    createPostController,
    createPostWithImageController,
    updatePostController
} = require('../postControllers/postController');
const uploadImages = require('../middlewares/uploadPostPictureToCloud');


// CREATE POST
router.post("/create", verifyToken, createPostController);

// CREATE POST WITH IMAGE
// upload.array indicate images to be uploaded and it should be maximum of five
router.post("/create/image",verifyToken, upload.array("image",5),uploadImages, createPostWithImageController);

// UPDATE POST
router.put("/update/:postId", verifyToken, updatePostController);

// GET ALL POSTS
// router.get("/all/:userId", getPostsController);

// GET USER POSTS
// router.get("/user/:userId", getUserPostsController);

// DELETE A POST
// router.delete("/delete/:postId", deletePostController);

// LIKE POST
// router.post("/like/:postId", likePostController);

// UNLIKE POST
// router.post("/dislike/:postId", dislikePostController);


module.exports = router