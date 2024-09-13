const User = require('../models/User');
const Conversation = require('../models/Conversation');
const { CustomError } = require('../middlewares/error');

const createNewConversationController = async (req, res, next) => {
    
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get info from the url
        const secondUserId = req.params;
        // check if user exist
        const userFirst = await User.findById({_id:userId});
        // throw error if not found
        if (!userFirst){
            throw new CustomError("User not found", 400);
        }
        if (!userFirst.isVerified){
            throw new CustomError("You are not allowed", 401);
        }
        // check if user exist
        const userSecond = await User.findById({_id:secondUserId});
        // throw error if not found
        if (!userSecond){
            throw new CustomError("User not found", 400);
        }
        if (!userSecond.isVerified){
            throw new CustomError("User is not found", 401);
        }
        // check if user was blocked by second user and throw error
        if (userSecond.blocklist.includes(userId)){
            throw new CustomError("The User already blocked you", 400)
        }
        // Check if both users are already in a conversation
        const existingConversation = await Conversation.findOne({
            participants: { $all: [userId, secondUserId] }
        });
        // if both user in conversation stop
        if (existingConversation) {
            // Return existing conversation's ID
            return res.status(200).json({
                message: "Conversation already exists",
                conversationId: existingConversation._id
            });
        }
        // Check if firstUser and secondUser are the same
        if (userId === secondUserId) {
            throw new CustomError("You can't chat with yourself!", 400);
        }
        
        // Create a new conversation if no existing conversation is found
        const newConversation = new Conversation({
            participants: [userId, secondUserId]
        });
        // save the new conversation created
        const savedConversation = await newConversation.save();

        res.status(201).json({message:'success', conversationId: savedConversation._id});
    } catch(error) {
        next(error);
    }

}


module.exports = createNewConversationController;