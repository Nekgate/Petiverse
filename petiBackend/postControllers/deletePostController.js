const deletePostController = async (req, res, next) => {
    // get the postId from the params
    const { postId } = req.params;
    try {
        // get post object
        const postToDelete = await Post.findById(postId);
        // throw error if not found
        if (!postToDelete) {
            throw new CustomError("User not found", 404);
        }
        // get user that posted
        const user = await User.findById(postToDelete.user);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // get the particular post
        user.posts=user.posts.filter(postId=>postId.toString()!==postToDelete._id.toString());
        // save the user 
        await user.save();
        // delete the post
        await postToDelete.deleteOne();

        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        next (error);
    }
}