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

const deleteUserController = async (req, res, next) => {
    // get userId from params
    const { userId } = req.params;
    try {
        // get the object of user
        const userToDelete = await User.findById(userId);
        // if userToDelete is not found throw error
        if (!userToDelete) {
            throw new CustomError("User not found", 404);
        }

        // delete all users post
        await Post.deleteMany({user:userId});
        // delete comment from all post
        await Post.deleteMany({"comments.user":userId});
        // delete comment replies from all post
        await Post.deleteMany({"comments.replies.user":userId});
        // delete users comments
        await Comment.deleteMany({user:userId});
        // delete story posted by user
        await Story.deleteMany({user:userId});
        // delete likes by user in post and update the list
        await Post.updateMany({likes:userId},{$pull:{likes:userId}});
        // unfollow all users followed by user
        await User.updateMany(
            {_id:{$in:userToDelete.following}},
            {$pull:{followers:userId}}
        );
        // delete all likes liked by user in comment and update the like list
        await Comment.updateMany({}, {$pull:{likes:userId}});
        // delete all likes liked by user in comment replies and update the like list
        await Comment.updateMany({"replies.likes":userId}, {$pull:{"replies.likes":userId}});
        // delete all likes liked by user on post
        await Post.updateMany({}, {$pull:{likes:userId}});
        // get all users from replies with the same userId
        const replyComments = await Comment.find({"replies.user":userId});
        // wait and remove all of them
        await Promise.all(
            replyComments.map(async(comment)=>{
                comment.replies=comments.replies.filter((reply)=>reply.user.toString()!=userId);
                await Comment.save();
            })
        );
        // delete user with the userId
        await userToDelete.deleteOne();
        res.status(200).json({message:"Everything about User have been deleted Successfully!"});

    } catch(error) {
        next(error);
    }
}



const uploadProfilePictureController = async (req, res, next) => {
    // get the userId from url
    const { userId } = req.params;
    // extract the file uploaded from request file
    const { filename } = req.file;
    try {
        // get the update the user object using the userId
        // updating only the generated file url in the file
        // new:true ensures it can create as many
        const user = await User.findByIdAndUpdate(userId, {profilePicture:generateFileUrl(filename)},{new:true});
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        res.status(200).json({message:"Profile picture updated successfully", user});

    } catch (error) {
        next(error);
    }
}

const uploadCoverPictureController = async (req, res, next) => {
    // get the userId from url
    const { userId } = req.params;
    // extract the file uploaded from request file
    const { filename } = req.file;
    try {
        // get the update the user object using the userId
        // updating only the generated file url in the file
        // new:true ensures it can create as many
        const user = await User.findByIdAndUpdate(userId, {coverPicture:generateFileUrl(filename)},{new:true});
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        res.status(200).json({message:"Cover picture updated successfully", user});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserController,
    updateUserController,
    followUserController,
    unfollowUserController,
    blockUserController,
    unblockUserController,
    getBlockedUsersController,
    deleteUserController,
    searchUserController,
    uploadProfilePictureController,
    uploadCoverPictureController,
}