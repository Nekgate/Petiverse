const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');

const deletePostController = async (req, res, next) => {
    // get the postId from the params
    const { postId } = req.params;
    try {
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