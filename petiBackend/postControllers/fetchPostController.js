const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');


const getPostsController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get user object
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // Get the list of users the current user is following
        const followingIds = user.following.map(id => id.toString());

        // Get the list of users who have blocked the current user
        const usersWhoBlockedMe = await User.find({ blocklist: userId }, '_id');
        const blockedMeIds = usersWhoBlockedMe.map(u => u._id.toString());

        // get all the blacklisted users from the user
        const blockedUsersIds = user.blocklist.map(id=>id.toString());
        // Combine the blocked lists for filtering
        const excludedUsersIds = [...blockedMeIds, ...blockedUsersIds];
        // Query to get posts:
        // 1. Posts from users the current user is following.
        // 2. Public posts from any user, excluding posts from users who blocked the current user or whom the user has blocked.
        const posts = await Post.find({
            $or: [
                { user: { $in: followingIds } },  // Posts from followed users
                { visibility: 'public' }          // Public posts
            ],
            user: { $nin: excludedUsersIds }     // Exclude posts from blocked/blockedMe users
        })
        .populate("user", "username fullName profilePicture"); // Populate user details for each post

        res.status(200).json({posts:posts});

    } catch (error) {
        next(error);
    }
}

const getAPostController = async (req, res) => {
    try {
        // Extract user ID from the token or session
        const userId = req.userId;
        
        // Throw an error if the user is not authenticated
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }

        // Find the current user by ID
        const user = await User.findById(userId);
        
        // Throw an error if the user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        // Get the post ID from the request parameters
        const { postId } = req.params;

        // Fetch the post from the database
        const post = await Post.findById(postId)
            .populate("user", "username fullName profilePicture");

        // Throw an error if the post is not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // if the post owner didnt block the user
        const postAuthor = await User.findById(post._id);
        // Check if the post visibility is allowed for the current user
        const isPostVisible = user.following.includes(post.user._id.toString()) || 
        (post.visibility === 'public' &&  
            !user.blocklist.includes(post.user._id.toString()) && 
            !postAuthor.blocklist.includes(userId.toString()));

        // Return an error if the post is not visible to the current user
        if (!isPostVisible) {
            throw new CustomError("Post not accessible", 403);
        }

        // Return the post in the response
        res.status(200).json(post);

    } catch (error) {
        next(error);
    }
};


const getUserPostsController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get user object
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // find all the user post
        const userPosts = await Post.find({user:userId});

        res.status(200).json({posts:userPosts});

    } catch (error) {
        next (error);
    }
}

module.exports = {
    getPostsController,
    getUserPostsController,
    getAPostController,
}