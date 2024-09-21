const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');
const { clearCache } = require('../utils/redisConfig');


const likePostController = async (req, res, next) => {
    try {
        // get the postId from the params
        const { postId } = req.params;
        // return no post to like
        if (!postId){
            return res.status(400).json({ message: "No post selected for like" });
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
        const user = await User.findById(userId);
        // found user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // get the properties of post author
        const postAuthor = await User.findById(post.user.toString());
        // throw error if not found
        if (!postAuthor){
            throw new CustomError("Post Author not found", 400);
        }
        // check if user is blacklisted by post author
        if (postAuthor.blocklist.includes(userId)){
            return res.status(401).json({message:"You are not authorized to like the post"});
        }
        // check if user is following the post author
        const isFollowing = postAuthor.followers.includes(userId);

        // If not following the post owner, check if the post visibility is public
        if (!isFollowing && post.visibility !== "public") {
            return res.status(403).json({ message: "You are not allowed to like this post" });
        }
        
        // check if user have liked before
        if (post.likes.includes(userId)) {
            return res.status(200).json({message:"Already following"});
        }
        // push userid to like post array
        post.likes.push(userId);
        // save the post again
        await post.save();
        // Define cache key
        const cacheKey = `post_${userId}`;
        const cacheKey1 = `userpost_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

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
            return res.status(200).json({message:"No post selected for like"});
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
         // Get the properties of the post author
        const postAuthor = await User.findById(post.user.toString());

        // Throw an error if the post author is not found
        if (!postAuthor) {
            throw new CustomError("Post author not found", 400);
        }

        // Check if the user is blacklisted by the post author
        if (postAuthor.blocklist.includes(userId)) {
            return res.status(401).json({ message: "You are not authorized to dislike the post" });
        }

        // Check if the user is following the post owner, or if the post is public
        const isFollowing = postAuthor.followers.includes(userId);

        if (!isFollowing && post.visibility !== "public") {
            return res.status(403).json({ message: "You are not allowed to dislike this post" });
        }
        // check if user have liked before
        if (!post.likes.includes(userId)) {
            return res.status(200).json({message:"Have not liked before following"});
        }
        // remove the userId from likes array and save
        post.likes=post.likes.filter(id=>id.toString()!==userId);
        // save the post again
        await post.save();
        // Define cache key
        const cacheKey = `post_${userId}`;
        const cacheKey1 = `userpost_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

        res.status(200).json({message:"post disliked", post});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    likePostController,
    dislikePostController
}