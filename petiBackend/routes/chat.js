const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const createNewConversationController = require('../chatControllers/chatContoller');
const deleteConversationController = require('../chatControllers/deleteChatControllers');
const getConversationOfUserController = require('../chatControllers/fetchChatControllers');
const router = express.Router();

// NEW CONVERSATIONS
router.post("/create/:secondUserId", verifyToken, createNewConversationController);

// GET CONVERSATIONS OF USER
router.get("/all/user", getConversationOfUserController);

// DELETE CONVERSATION
router.delete("/delete/:conversationId", verifyToken, deleteConversationController);

module.exports = router;