const { CustomError } = require('../middlewares/error');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Story = require('../models/Story');

const deleteUserController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
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
        // clear all caches
        clearAllCaches();
        
        res.clearCookie("token")
        .status(200)
        .json("User Deleted successfully!");
    } catch(error) {
        next(error);
    }
}

module.exports = deleteUserController;
