const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/multerConfig');
const uploadStoryImage = require('../middlewares/uploadStoryPictureToCloud');
const createStoryController = require('../storyControllers/storyController');
const { getStoriesController, getUserStoriesController } = require('../storyControllers/fetchStoryController');
const { deleteUserStoriesController, deleteAStoryController } = require('../storyControllers/deleteStoryController');
const router = express.Router();

// CREATE STORY
router.post("/create", verifyToken, upload.single(image), uploadStoryImage, createStoryController);

// GET ALL STORIES
router.get("/all/user/following", verifyToken, getStoriesController);

// GET USER STORIES
router.get("/user/stories", verifyToken, getUserStoriesController);

// DELETE A STORY
router.delete("/delete/:storyId", verifyToken, deleteAStoryController);

// DELETE ALL USER STORIES
router.delete("/delete/all/user/stories", verifyToken, deleteUserStoriesController);

module.exports = router;