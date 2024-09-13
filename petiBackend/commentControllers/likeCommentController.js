const User = require('../models/User');
const Comment = require('../models/Comment');
const { CustomError } = require("../middlewares/error");


const likeCommentController = async (req, res, next) => {
    try {
        // get comment id from url
        const { commentId } = req.params;
        // throw new error if commentId is not found on url
        if (!commentId){
            throw new CustomError("No query in path for comment", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user have liked the post before
        if (comment.likes.includes(userId)){
            throw new CustomError("Liked this comment before", 400);
        }
        // add the user liking to the comment like
        comment.likes.push(userId);
        // save the comment
        await comment.save()

        res.status(201).json({message:"Comment liked successfully", comment});
    } catch(error) {
        next(error);
    }
}

const dislikeCommentController = async (req, res, next) => {
    try {
        // get comment id from url
        const { commentId } = req.params;
        // throw new error if commentId is not found on url
        if (!commentId){
            throw new CustomError("No query in path for comment", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user have liked the post before
        if (!comment.likes.includes(userId)){
            throw new CustomError("You have not liked the comment before", 400);
        }
        // filter/remove the comment likes id and remove this user
        comment.likes=comment.likes.filter(id=>id.toString()!==userId);
        // save the comment
        await comment.save()

        res.status(201).json({message:"Comment disliked successfully", comment});
    } catch(error) {
        next(error);
    }
}

const likeReplyCommentController = async (req, res, next) => {
    try {
        // get comment id & reply id  from url
        const { commentId, replyId } = req.params;
        // throw error if the comment & replyId is not provided
        if (!(commentId && replyId)) {
            throw new CustomError("CommentId and ReplyId is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check for the replyId in the comment
        const replyComment = comment.replies.id(replyId);
        // throw error if not found
        if (!replyComment) {
            throw new CustomError("Reply comment not found", 404);
        }
        // throw error if user have liked the reply before
        if (replyComment.likes.includes(userId)){
            throw new CustomError("You have liked the reply before", 400);
        }
        // add the user to the reply array
        replyComment.likes.push(userId);
        // save comment
        await comment.save();

        res.status(200).json({message:"Reply comment liked successfully!", comment});
    } catch(error) {
        next(error);
    }
}

const dislikeRelpyCommentController = async (req, res, next) => {
    try {
        // get comment id & reply id  from url
        const { commentId, replyId } = req.params;
        // throw error if the comment & replyId is not provided
        if (!(commentId && replyId)) {
            throw new CustomError("CommentId and ReplyId is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check for the replyId in the comment
        const replyComment = comment.replies.id(replyId);
        // throw error if not found
        if (!replyComment) {
            throw new CustomError("Reply comment not found", 404);
        }
        // throw error if user have not liked the reply before 
        if (!replyComment.likes.includes(userId)){
            throw new CustomError("You have not liked the reply comment", 400);
        }
        // remove the userid from reply likes array
        replyComment.likes = replyComment.likes.filter(id=>id.toString()!==userId);
        // save comment
        await comment.save();

        res.status(200).json({message:"Reply comment disliked successfully!", comment});
    } catch(error) {
        next(error);
    }
}

module.exports = {
    likeCommentController,
    dislikeCommentController,
    likeReplyCommentController,
    dislikeRelpyCommentController
}