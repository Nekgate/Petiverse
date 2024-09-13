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
        // check if user in the participant of the conversation
        const userInConvo = await Conversation.find({
            participants:{$in:[userId]},
        })
        // throw error if user is not part of the conversation
        if (!userInConvo) {
            throw new CustomError("You cannot get message of others", 401);
        }
        // get all message that have same conversation Id
        const messages = await Message.find({
            conversation:conversationId
        });
        res.status(200).json(messages);

    } catch(error) {
        next(error);
    }
}

module.exports = getMessagesController;