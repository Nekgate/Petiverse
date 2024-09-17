const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');

const deletePostController = async (req, res, next) => {
    try {
        // get the postId from the params
        const { postId } = req.params;
        // return no post to like
        if (!postId){
            return res.status(200).json({ message: "No post selected for deletion" });
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get post object
        const postToDelete = await Post.findById(postId);
        // throw error if not found
        if (!postToDelete) {
            throw new CustomError("Post not found", 404);
        }
        // get user that posted
        const user = await User.findById(postToDelete.user);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if the post owner is logged user
        if (postToDelete.user.toString() !== userId.toString()){
            throw new CustomError("You are not authorized to delete this post", 401);
        }
        // Remove the postId from the user's list of posts
        user.posts=user.posts.filter(postId=>postId.toString()!==postToDelete._id.toString());
        // save the user 
        await user.save();
        // Delete the post by its ID
        await Post.findByIdAndDelete(postId);

        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        next (error);
    }
}

module.exports = deletePostController;