const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { CustomError } = require('../middlewares/error');
const { clearCache } = require('../utils/redisConfig');

const deleteConversationController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // extract conversation from url
        const { conversationId } = req.params;
        // check if conversation exist
        const conversation = await Conversation.findById(conversationId);
        // throw error if not found
        if (!conversation) {
            throw new CustomError("Conversation not found!", 404);
        }
        // check if user is part of the conversation
        if (!conversation.participants.includes(userId)){
            throw new CustomError("You cannot delete the message", 401);
        }
        // delete conversation id from the conversations
        await Conversation.deleteOne({_id:conversationId});
        // delete all message partaining to the conversation
        await Message.deleteMany({conversationId:conversationId});
        // Define cache key
        const cacheKey = `chat_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);

        res.status(200).json({message:"Conversion deleted successfully"});

    } catch(error) {
        next(error);
    }
}

module.exports = deleteConversationController;
