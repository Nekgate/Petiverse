const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { CustomError } = require("../middlewares/error");

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

        res.status(200).json({comments});
    } catch(error) {
        next(error);
    }
}

module.exports = getCommentsByPostController;
