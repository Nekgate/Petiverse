const { CustomError } = require('../middlewares/error');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Story = require('../models/Story');
const generateFileUrl = require('../middlewares/generateFileUrl');


const updateUserController = async (req, res, next) => {
    // get user id fro url
    const { userId } = req.params;
    // get update data from body
    const updateData = req.body;
    try {
        // get the userId from url
        const { userId } = req.params;
        // throw error if params is not available
        if (!userId){
            throw new CustomError("User Id is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // get the user object using the userId
        const userToUpdate = await User.findById(userId);
        // throw error if not found
        if (!userToUpdate) {
            throw new CustomError("User not found!", 404);
        }
        // assign the updatedata to the userId
        Object.assign(userToUpdate,updateData);
        // save to database
        await userToUpdate.save();
        // send response successfully
        res.status(200).json({message:"User updated Successfully!", user:userToUpdate});
    } catch(error) {
        next(error);
    }
};






module.exports = {
    getUserController,
    updateUserController,
    deleteUserController,
    searchUserController,
    uploadProfilePictureController,
    uploadCoverPictureController,
}