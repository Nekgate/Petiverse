const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { CustomError } = require('../middlewares/error');

const getMessagesController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get conversation id from url
        const { conversationId } = req.params;
        // check if conversationId exist
        const conversation = await Conversation.findById(conversationId);
        // throw a error if not found
        if (!conversation){
            throw new CustomError("Conversation not found", 404);
        }
        // check if user is a participant of the conversation
        const isUserInConversation = conversation.participants.includes(userId);
        if (!isUserInConversation) {
            throw new CustomError("You cannot view messages of a conversation you're not part of", 403);
        }

        // get all messages with the same conversation Id
        const messages = await Message.find({ conversationId: conversationId }).sort({ createdAt: -1 });
        res.status(200).json(messages);

    } catch(error) {
        next(error);
    }
}

module.exports = getMessagesController;