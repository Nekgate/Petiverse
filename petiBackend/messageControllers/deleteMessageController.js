const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');

const deleteMessageController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get message id from url
        const { messageId } = req.params;
        // throw error if no message id
        if (!messageId) {
            throw new CustomError("MessageId is not found", 400);
        }
        // check if message exist
        const message = await Message.findById(messageId);
        // throw error if it don't exist
        if (!message) {
            throw new CustomError("Message not found", 400);
        }
        // check if user in the participant of the conversation
        const userInConvo = await Conversation.find({
            participants:{$in:[userId]},
        })
        // throw error if user is not part of the conversation
        if (!userInConvo) {
            throw new CustomError("You are not authorized", 401);
        }
        // Check if the user is the sender of the message
        if (message.sender.toString() !== userId.toString()) {
            throw new CustomError("You cannot delete this message", 403);
        }
        // find and delete the message in the database
        await Message.findByIdAndDelete(messageId);

        res.status(200).json({message:"Message deleted succcessfully!"});
    } catch(error) {
        next(error);
    }
}

module.exports = deleteMessageController;