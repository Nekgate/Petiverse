const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const verifyToken = require('../middlewares/verifyToken');
const { 
    getUserController,
    getBlockedUsersController,
    searchUserController,
    getAllUsersVerifiedController,
    getAllNotUsersVerifiedController,
    getFollowersController,
    getFollowingController,
} = require('../userControllers/getUserController');
const { 
    followUserController,
    unfollowUserController,
    blockUserController,
    unblockUserController,
} = require('../userControllers/userFollowBlockController');
const deleteUserController = require('../userControllers/userDeleteController');
const updateUserController = require('../userControllers/userUpdateControllerApp');
const uploadImage = require('../middlewares/uploadProfilePictureToCloud');
const uploadCoverImage = require('../middlewares/uploadCoverPictureToCloud');
const { uploadProfilePictureController, uploadCoverPictureController } = require('../userControllers/userUploadPictureController');

// GET USER
router.get("/find/:userId", verifyToken, getUserController);

// GET ALL USERS
router.get("/users/verified", verifyToken, getAllUsersVerifiedController);

// GET ALL NOT VERIFIED USERS
router.get("/users/not-verified", verifyToken, getAllNotUsersVerifiedController);

// GET FOLLOWERS OF USER
router.get("/followers/:userId", verifyToken, getFollowersController);

// GET FOLLOWING OF USER
router.get("/following/:userId", verifyToken, getFollowingController);

// GET BLOCKED USERS
router.get("/blocked/:userId", verifyToken, getBlockedUsersController);

// SEARCH USER
router.get("/search/:query", verifyToken, searchUserController);

// UPDATE USER
router.put("/update", verifyToken, updateUserController);

// FOLLOW USER
router.post("/follow/:userId", verifyToken, followUserController);

// UNFOLLOW USER
router.post("/unfollow/:userId", verifyToken, unfollowUserController);

// BLOCK USER
router.post("/block/:userId", verifyToken, blockUserController);

// UNBLOCK USER
router.post("/unblock/:userId", verifyToken, unblockUserController);

// DELETE USER 
router.delete("/delete", verifyToken, deleteUserController);

// UPDATE PROFILE PICTURE
// upload.single("profilePicture") changes the name of the file to profilePicture
router.put(
    "/update-profile-picture",
    verifyToken,
    upload.single("profilePicture"),
    uploadImage,
    uploadProfilePictureController
);

// UPDATE COVER PICTURE
router.put(
    "/update-cover-picture",
    verifyToken,
    upload.single("coverPicture"),
    uploadCoverImage,
    uploadCoverPictureController
);

module.exports = router;