const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { CustomError } = require("../middlewares/error");
const { getValue, setValue } = require('../utils/redisConfig');

const populateUserDetails = async (comments) => {
    // populateUserDetails arrange how information will be represented
    // each comment in the post
    for (const comment of comments) {
        // display their user with username fullName & profilePicture
        await comment.populate("user", "username fullName profilePicture");
        // if there is user in the comment
        if (comment.replies.length>0){
            // display users that reply with username fullName & profilePicture
            await comment.populate("replies.user", "username fullName profilePicture");
        }
    }
}

const getCommentsByPostController = async (req, res, next) => {
    try {
        // get postId from url
        const { postId } = req.params;
        // throw error if there is no postId provided
        if (!postId) {
            throw new CustomError("postId not found", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // Define cache key
        const cacheKey = `comment_${userId}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "posts (from cache)",
                user: cachedUser
             });
         }
        // check if post exist
        const post = Post.findById(postId);
        // throw error if not found
        if (!post){
            throw new CustomError("Post not found", 404);
        }
        // get all comment associated with the post
        const comments = await Comment.find({post:postId});
        // populate how the comment will be displayed
        await populateUserDetails(comments);
        // Cache the result in Redis for future requests, set expiration time 90 sec
       await setValue(cacheKey, comments, 3600); // 2 minutes

        res.status(200).json({comments});
    } catch(error) {
        next(error);
    }
}

module.exports = getCommentsByPostController;
