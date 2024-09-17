const express = require('express');  // Import Express framework
const router = express.Router();  // Create a new router object
const upload = require('../middlewares/multerConfig'); // calling multer config  function
const verifyToken = require('../middlewares/verifyToken');
const { 
    createPostController,
    createPostWithImageController,
    updatePostController,
    updatePostVisibilityController
} = require('../postControllers/postController');
const uploadImages = require('../middlewares/uploadPostPictureToCloud');
const { getPostsController, getAPostController, getUserPostsController, getAUserPostController, getAllPostsForAdminController } = require('../postControllers/fetchPostController');
const deletePostController = require('../postControllers/deletePostController');
const { likePostController, dislikePostController } = require('../postControllers/likeDislikePostController');


// CREATE POST
router.post("/create", verifyToken, createPostController);

// CREATE POST WITH IMAGE
// upload.array indicate images to be uploaded and it should be maximum of five
router.post("/create/image",verifyToken, upload.array("image",5),uploadImages, createPostWithImageController);

// UPDATE POST
router.put("/update/:postId", verifyToken, updatePostController);

// UPDATE POST VISIBILITY
router.put("/update/visibility/:postId", verifyToken, updatePostVisibilityController);

// GET A POSTS
router.get("/:postId", verifyToken, getAPostController);

// GET ALL POSTS
router.get("/all", verifyToken, getPostsController);

// GET ALL POSTS FROM A USER
router.get("/users/posts", verifyToken, getUserPostsController);

// GET A SINGLE POST OF USER
router.get("/user/:postId", verifyToken, getAUserPostController);

// DELETE A POST
router.delete("/delete/:postId", verifyToken, deletePostController);

// LIKE POST
router.post("/like/:postId", verifyToken, likePostController);

// UNLIKE POST
router.post("/dislike/:postId", verifyToken, dislikePostController);

// GET ALL POST FOR ADMIN TESTING, SHOULD BE DELETED BEFORE PRODUCTION
router.get("/admin/all/posts", getAllPostsForAdminController);


module.exports = router