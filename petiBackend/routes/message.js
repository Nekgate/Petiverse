const express = require("express");
const { createMessageController, editMessageController } = require("../messageControllers/messageController");
const getMessagesController = require("../messageControllers/fetchMessageController");
const deleteMessageController = require("../messageControllers/deleteMessageController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// CREATE MESSAGE
router.post("/chat/:conversationId/create", verifyToken, createMessageController);

// EDIT MESSAGE
router.put("/chat/:conversationId/edit/:messageId", verifyToken, editMessageController);

// GET MESSAGES
router.get("/chat/:conversationId", verifyToken, getMessagesController);

// DELETE MESSAGE
router.delete("/delete/:messageId", verifyToken, deleteMessageController);

module.exports = router;