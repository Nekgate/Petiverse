const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/multerConfig');
const uploadStoryImage = require('../middlewares/uploadStoryPictureToCloud');
const createStoryController = require('../storyControllers/storyController');
const router = express.Router();

// CREATE STORY
router.post("/create", verifyToken, upload.single(image), uploadStoryImage, createStoryController);

// GET ALL STORIES
router.get("/all/:userId", getStoriesController);

// GET USER STORIES
router.get("/user/:userId", getUserStoriesController);

// DELETE A STORY
router.delete("/delete/:storyId", deleteStoryController);

// DELETE ALL USER STORIES
router.delete("/delete/all/stories/:userId", deleteUserStoriesController);

module.exports = router;