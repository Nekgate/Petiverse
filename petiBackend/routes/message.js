const express = require("express");
const { createMessageController, editMessageController } = require("../messageControllers/messageController");
const getMessagesController = require("../messageControllers/fetchMessageController");
const deleteMessageController = require("../messageControllers/deleteMessageController");
const router = express.Router();

// CREATE MESSAGE
router.post("/create", createMessageController);

// EDIT MESSAGE
router.put("/edit/:messageId", editMessageController);

// GET MESSAGES
router.get("/:conversationId", getMessagesController);

// DELETE MESSAGE
router.delete("/delete/:messageId", deleteMessageController);

module.exports = router;