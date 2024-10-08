const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');
const { emitMessage } = require('../utils/socketIOConfig');
const { clearCache } = require('../utils/redisConfig');

const createMessageController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // destructure and get every item from body and params
        const { conversationId } = req.params;
        const { text } = req.body;
        
        // check if text is empty
        if (!text){
            throw new CustomError("Text is not found", 400);
        }
        // check if conversationId exist
        const conversation = await Conversation.findById(conversationId);
        
        // throw error if not found
        if (!conversation) {
            throw new CustomError("Conversation not found!", 404)
        }
        // check if conversationId exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found!", 404)
        }
        // check if user in the participant of the conversation
        const userInConvo = conversation.participants.includes(userId);
        // throw error if user is not part of the conversation
        if (!userInConvo) {
            throw new CustomError("You cannot message in this convo", 401);
        }
        // create new message
        const newMessage = new Message({
            text,
            conversationId,
            sender:userId,
        })
        // save newMessage
        await newMessage.save();
        // Define cache key
        const cacheKey = `message_${conversationId}`;
        // clear cache of the user
        clearCache(cacheKey);

        // emit message to user instantly
        emitMessage(conversationId, { conversationId, userId, text });

        res.status(201).json({text: newMessage.text});
    } catch(error) {
        next(error);
    }
}

const editMessageController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const { conversationId } = req.params; // to be deleted during production
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // Destructure and get messageId and updatedText from body
        const { messageId } = req.params;
        const { text } = req.body;
        // throw error if text is not available
        if (!text) {
            throw new CustomError("Text is not found", 400);
        }
        // check if conversationId exist
        const conversation = await Conversation.findById(conversationId);
        
        // throw error if not found
        if (!conversation) {
            throw new CustomError("Conversation not found!", 404)
        }

        // Find the message by its ID
        const message = await Message.findById(messageId);
        // Throw error if message is not found
        if (!message) {
            throw new CustomError("Message not found!", 404);
        }
        // check if user in the participant of the conversation
        const userInConvo = conversation.participants.includes(userId);
        // throw error if user is not part of the conversation
        if (!userInConvo) {
            throw new CustomError("You cannot message in this convo", 401);
        }
        // Check if the user is the sender of the message
        if (message.sender.toString() !== userId) {
            throw new CustomError("You cannot edit this message", 403);
        }

        // Update the message text
        message.text = text;
        await message.save();
        // Define cache key
        const cacheKey = `message_${conversationId}}`;
        // clear cache of the user
        clearCache(cacheKey);

        // emit message to user instantly
        emitMessage(message.conversationId, { conversationId: message.conversationId, userId, text });

        res.status(200).json({ text: message.text });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    createMessageController,
    editMessageController
};