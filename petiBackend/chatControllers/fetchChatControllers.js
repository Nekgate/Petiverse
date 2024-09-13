const User = require('../models/User');
const Conversation = require('../models/Conversation');
const { CustomError } = require('../middlewares/error');

const getConversationOfUserController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user){
            throw new CustomError("User not found", 404);
        }
        // check if user is registed in participant 
        const conversation = await Conversation.find({
            participants:{$in:[userId]},
        })
        .populate({
            path: 'participants',  // Populate the participants field
            select: 'username profilePicture',    // Select only the username field
            match: { _id: { $ne: userId } }  // Exclude the current user's ID
        });

        res.status(200).json(conversation);
    } catch(error) {
        next(error);
    }
}

module.exports = getConversationOfUserController;