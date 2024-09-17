const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');


const likePostController = async (req, res, next) => {
    try {
        // get the postId from the params
        const { postId } = req.params;
        // return no post to like
        if (!postId){
            res.status(200).json({message:"No post selected for like"});
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // find the postId in database
        const post = await Post.findById(postId);
        // throw error if not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // find user with userId
        const user = User.findById(userId);
        // found user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        
        // check if user have liked before
        if (post.likes.includes(userId)) {
            res.status(200).json({message:"Already following"});
        }
        // push userid to like post array
        post.likes.push(userId);
        // save the post again
        await post.save();
        res.status(200).json({message:"post liked", post});

    } catch (error) {
        next(error);
    }
}

const dislikePostController = async (req, res, next) => {
    try {
        // get the postId from the params
        const { postId } = req.params;
        // return no post to like
        if (!postId){
            res.status(200).json({message:"No post selected for like"});
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // find the postId in database
        const post = await Post.findById(postId);
        // throw error if not found
        if (!post) {
            throw new CustomError("Post not found", 400);
        }
        // find user with userId
        const user = User.findById(userId);
        // found user not found throw error
        if (!user) {
            throw new CustomError("User not found", 400);
        }
        // check if user have liked before
        if (!post.likes.includes(userId)) {
            res.status(200).json({message:"Have not liked before following"});
        }
        // remove the userId from likes array and save
        post.likes=post.likes.filter(id=>id.toString()!==userId);
        // save the post again
        await post.save();
        res.status(200).json({message:"post disliked", post});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    likePostController,
    dislikePostController
}