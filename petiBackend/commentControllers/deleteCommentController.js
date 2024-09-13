const deleteCommentController = async (req, res, next) => {
    // get comment id & reply id  from url
    const { commentId } = req.params;
    try {
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // find the comment in the post remove it and update
        await Post.findOneAndUpdate(
            {comments:commentId},
            {$pull:{comments:commentId}},
            {new:true}
        )
        // delete the comment
        await comment.deleteOne()

        res.status(200).json({message:"Comment has been deleted!"});
    } catch(error) {
        next(error);
    }
}

const deleteReplyCommentController = async (req, res, next) => {
    // get comment id & reply id  from url
    const { commentId, replyId } = req.params;
    try {
        // check if commentId exist
        const comment = await Comment.findById(commentId);
        // throw error if not found
        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }
        // filter out replyId from comment
        comment.replies = comment.replies.filter(id=>{
            id.toString()!==replyId
        });
        
        // save the comment
        await comment.save();

        res.status(200).json({message:"Reply deleted successfully", comment});

    } catch(error) {
        next(error);
    }
}