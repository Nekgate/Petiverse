const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { CustomError } = require('../middlewares/error');


const createCommentController = async (req, res, next) => {
    try {
        // get postId from the url
        const { postId } = req.params;
        // throw error if no post id
        if (!postId) {
            throw new CustomError("You have to comment on a post", 400);
        }
        // get text form body
        const { text } = req.body;
        // throw error if text is empty
        if (!text){
            throw new CustomError("Text not found", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get post with postId
        const post = await Post.findById(postId);
        // throw error if not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // check user with userId
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // add the info to comment session
        const newComment = new Comment({
            user:userId,
            post:postId,
            text,
        });
        // save comment
        await newComment.save();
        // add comment to the post
        post.comments.push(newComment._id);
        // save post
        await post.save();

        res.status(201).json({message:"Comment added to Post Successfully",comment:newComment});


    } catch (error) {
        next (error);
    }
};


const createCommentReplyController = async (req, res, next) => {
    try {
        // get comment id from url
        const { commentId } = req.params;
        // if no commentId throw error
        if (!commentId){
            throw new CustomError("You need a comment to reply", 400);
        }
        // get userId,text form body
        const { text } = req.body;
        // throw error if text is empty
        if (!text){
            throw new CustomError("Text not found", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const parentComment = await Comment.findById(commentId);
        // throw error if not found
        if (!parentComment) {
            throw new CustomError("Comment not found", 404);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // assign the reply in it structure
        const reply = {
            text,
            user:userId,
        }

        // add the reply to the comment
        parentComment.replies.push(reply);
        // save the comment
        await parentComment.save();

        res.status(201).json({message:"Reply have been created", reply});
    } catch (error) {
        next (error);
    }
};


const updateCommentController = async (req, res, next) => {
    
    try {
        // get comment id from url
        const { commentId } = req.params;
        // if no commentId throw error
        if (!commentId){
            throw new CustomError("You need a comment to reply", 400);
        }
        // get text form body
        const { text } = req.body;
        // throw error if text is empty
        if (!text){
            throw new CustomError("Text not found", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const commentToUpdate = await Comment.findById(commentId);
        // throw error if not found
        if (!commentToUpdate) {
            throw new CustomError("Comment not found", 404);
        }
        // throw error if userId is not the user that created the comment
        if (commentToUpdate.user !== userId){
            throw new CustomError("You are not authorized to update comment", 401);
        }
        // find and update the comment with the text
        const updatedComment = await Comment.findByIdAndUpdate(commentToUpdate,{text},{new:true});

        res.status(200).json({message:"Comment updated successfully", updatedComment});
    } catch (error) {
        next (error);
    }
};


const updateReplyCommentController = async (req, res, next) => {
    
    try {
        // get comment id & reply id  from url
        const { commentId, replyId } = req.params;
        // if no commentId throw error
        if (!(commentId && replyId)){
            throw new CustomError("You need a comment and reply", 400);
        }
        // get text form body
        const { text } = req.body;
        // throw error if text is empty
        if (!text){
            throw new CustomError("Text not found", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if commentId exist
        const parentComment = await Comment.findById(commentId);
        // throw error if not found
        if (!parentComment) {
            throw new CustomError("Comment not found", 400);
        }
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 400);
        }
        // iterate to find the reply index
        const replyIndex = parentComment.replies.findIndex((reply)=>reply._id.toString()===replyId);
        // throw error if not found
        if (replyIndex === -1) {
            throw new CustomError("Reply not found", 400);
        }
        // authorization of owner of replies
        if (parentComment.replies[replyIndex].user.toString()!==userId){
            throw new CustomError("You can not change another user reply", 404);
        }
        // replace the text with the text of reply index
        parentComment.replies[replyIndex].text = text;
        // save the parentComment
        await parentComment.save();

        res.status(200).json({message:"Reply updated successfully", parentComment});
    } catch (error) {
        next (error);
    }
};


module.exports = {
    createCommentController,
    createCommentReplyController,
    updateCommentController,
    updateReplyCommentController,
}