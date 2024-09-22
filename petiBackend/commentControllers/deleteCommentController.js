const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { CustomError } = require("../middlewares/error");
const { clearCache } = require('../utils/redisConfig');

const deleteCommentController = async (req, res, next) => {
    try {
        // get comment id & reply id  from url
        const { commentId } = req.params;
        // throw error if no comment id
        if (!commentId) {
            throw new CustomError("The commentId is required", 400);
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
        // throw error if user that commented is not the same with user logged in
        if (comment.user._id.toString() !== userId){
            throw new CustomError("You have no permission delete the comment", 401);
        }
        // find the comment in the post remove it and update
        await Post.findOneAndUpdate(
            {comments:commentId},
            {$pull:{comments:commentId}},
            {new:true}
        )
        // delete the comment
        await comment.deleteOne();
        // Define cache key
        const cacheKey = `comment_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);

        res.status(200).json({message:"Comment has been deleted!"});
    } catch(error) {
        next(error);
    }
}

const deleteReplyCommentController = async (req, res, next) => {
    
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
        // iterate to find the reply index
        const replyIndex = comment.replies.findIndex((reply)=>reply._id.toString()===replyId);
        // throw error if not found
        if (replyIndex === -1) {
            throw new CustomError("Reply not found", 400);
        }
        // check if the user that posted is same that is  deleting the reply
        if (comment.replies[replyIndex].user.toString()!==userId){
            throw new CustomError("You can not change another user reply", 404);
        }
        // filter or delete out replyId from comment
        comment.replies = comment.replies.filter(id=>{
            id.toString()!==replyId
        });
        
        // save the comment
        await comment.save();
        // Define cache key
        const cacheKey = `comment_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);

        res.status(200).json({message:"Reply deleted successfully", comment});

    } catch(error) {
        next(error);
    }
}

module.exports = {
    deleteCommentController,
    deleteReplyCommentController
}