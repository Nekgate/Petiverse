const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');


const getPostsController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            return res.status(401).json({ message: "You have to login first" });
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
        // parameter for post return
        const limit = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;
        // Query to get posts:
        // 1. Posts from users the current user is following.
        // 2. Public posts from any user, excluding posts from users who blocked the current user or whom the user has blocked.
        const posts = await Post.find({
            $or: [
                { visibility: 'friends', user: { $in: followingIds.length > 0 ? followingIds : [] } },  // Posts from followed users
                { visibility: 'public' }          // Public posts
            ],
            user: { $nin: excludedUsersIds }     // Exclude posts from blocked/blockedMe users
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "username fullName profilePicture"); // Populate user details for each post

        // calculating the total post to be given to a user
        const totalPosts = await Post.countDocuments({
            $or: [
                { visibility: 'public' },
                { visibility: 'friends', user: { $in: followingIds } }
            ],
            user: { $nin: excludedUsersIds }
        });
        // getting the total page
        const totalPages = Math.ceil(totalPosts / limit);

        // return response with page number
        res.status(200).json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts
        });

    } catch (error) {
        next(error);
    }
}

const getAPostController = async (req, res) => {
    try {
        // Get the postId from the params
        const { postId } = req.params;

        // Return an error if postId is not provided
        if (!postId) {
            return res.status(400).json({ message: "No post selected" });
        }
        // Extract user ID from the token or session
        const userId = req.userId;
        
        // Throw an error if the user is not authenticated
        if (!userId) {
            return res.status(401).json({ message: "You have to login first" });
        }

        // Find the current user by ID
        const user = await User.findById(userId);
        
        // Throw an error if the user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }

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
        // Check if the post author has blocked the current user
        if (postAuthor.blocklist.includes(userId)) {
            return res.status(403).json({ message: "You are not authorized to view this post" });
        }

        // Check if the post is private and the current user is not following the author
        if (post.visibility === 'friends' && !user.following.includes(postAuthor._id)) {
            return res.status(403).json({ message: "You are not authorized to view this private post" });
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
        // Get pagination parameters from the query string or set default values
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        // Calculate the number of posts to skip based on the current page
        const skip = (page - 1) * limit;
        // find all the user post
        const userPosts = await Post.find({user:userId})
        .populate("user", "username fullName profilePicture")
        .skip(skip)
        .limit(limit);

        // Fetch the total number of posts by the user for pagination metadata
        const totalPosts = await Post.countDocuments({ user: userId });

        // Calculate total pages based on total posts and limit
        const totalPages = Math.ceil(totalPosts / limit);

        // Check if the user has any posts
        if (userPosts.length === 0) {
            return res.status(200).json({ message: "No posts found for this user" });
        }

        // Respond with the user's posts along with pagination metadata
        res.status(200).json({
            posts: userPosts,
            currentPage: page,
            totalPages: totalPages,
            totalPosts: totalPosts
        });

    } catch (error) {
        next (error);
    }
}

const getAUserPostController = async (req, res, next) => {
    try {
        // Get the postId from the request parameters
        const { postId } = req.params;
    
        // Get the userId from the verified token from cookie
        const userId = req.userId;
    
        // Throw error if no userId is found (user is not logged in)
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
    
        // Find the user object in the database using userId
        const user = await User.findById(userId);
    
        // Throw error if the user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
    
        // Find the specific post by postId and ensure it's owned by the user
        const userPost = await Post.findOne({ _id: postId, user: userId })
            .populate("user", "username fullName profilePicture");
    
        // Throw error if the post is not found
        if (!userPost) {
            throw new CustomError("Post not found or you are not authorized", 404);
        }
    
        // Respond with the single post data
        res.status(200).json({ post: userPost });
    
    } catch (error) {
        // Handle errors and pass to the next middleware
        next(error);
    }    
}

const getAllPostFromAUser = async (req, res, next) => {
    try {
        // Get the userId from the verified token from cookie
        const loggedUser = req.userId;
    
        // Throw error if no userId is found (user is not logged in)
        if (!loggedUser) {
            return res.status(401).json("You have to login first");
        }
        // get the userId from url
        const { userId } = req.params;
        // throw error if no Id is in the params
        if (!userId){
            throw new CustomError("UserId is required", 400);
        }
        // check if the user Id is in the database
        const user = await User.findById({_id:userId});
        // throw error if user not found
        if (!user){
            throw new CustomError("User not found", 400);
        }
        // check if user blacklisted logged in user
        if (user.blocklist.includes(loggedUser)){
            return res.status(401).json("Your not authorized to view post", 401);
        }
        // check if loggedUser is following user to view friends visiblity 
        // and if logged user is not following user show only public
        const isLoggedUserFollowing = user.followers.includes(loggedUser);
        // If not following, show only public posts
        const visibilityFilter = isLoggedUserFollowing ? {} : { visibility: "public" };

        // Fetch the posts based on visibility and userId
        const posts = await Post.find({ user: userId, ...visibilityFilter });

        // Return the posts in the response
        res.status(200).json(posts);
    } catch {
        next(error);
    }
}

const getApostFromUser = async (req, res, next) => {
    try {
        // Get the userId from the verified token from cookie
        const loggedUser = req.userId;
    
        // Throw error if no userId is found (user is not logged in)
        if (!loggedUser) {
            return res.status(401).json("You have to login first");
        }
        // get the userId from url
        const { userId, postId } = req.params;
        // throw error if no Id is in the params
        if (!userId || !postId){
            throw new CustomError("UserId and PostId is required", 400);
        }
         // check if the user Id is in the database
         const user = await User.findById({_id:userId});
         // throw error if user not found
         if (!user){
             throw new CustomError("User not found", 400);
         }
         // check if user blacklisted logged in user
        if (user.blocklist.includes(loggedUser)){
            return res.status(401).json("Your not authorized to view post", 401);
        }
        //  check if the post Id is available
        const post = await Post.findById(postId);
        // throw error if no post find
        if (!post) {
            throw new CustomError("Post is not found", 400);
        }
        // check if the userId is the owner of the post
        if(!user.posts.includes(postId)){
            throw new CustomError("Post is not found", 400);
        }
        // Check if logged-in user is following the post author
        const isLoggedUserFollowing = user.followers.includes(loggedUser);

        // If logged-in user is not following, check post visibility
        if (!isLoggedUserFollowing && post.visibility !== "public") {
            return res.status(403).json({ message: "You're not authorized to view this post" });
        }

        res.status(200).json(post)
        
    } catch(error) {
        next(error);
    }
}

const getAllPostsForAdminController = async (req, res, next) => {
    try {
        // Extract pagination parameters from query
        const { page = 1, limit = 10 } = req.query;

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * pageSize;
        // get all the post in database
        const posts = await Post.find()
        .skip(skip)
        .limit(pageSize);
        // Count total number of posts for pagination metadata
        const totalPosts = await Post.countDocuments();

        // Send response with paginated posts and metadata
        res.status(200).json({
            message: 'success',
            posts,
            pagination: {
                totalPosts,
                totalPages: Math.ceil(totalPosts / pageSize),
                currentPage: pageNumber,
                pageSize
            }
        });
    } catch(error) {
        next(error);
    }
    
}

module.exports = {
    getPostsController,
    getUserPostsController,
    getAPostController,
    getAUserPostController,
    getAllPostsForAdminController,
    getAllPostFromAUser,
    getApostFromUser
}