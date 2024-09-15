const Post = require('../models/Post');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');

const createPostController = async (req, res, next) => {
    
    try {
        // get the id and post info from body
        let { caption, visibility } = req.body;
        // throw error if no caption
        if (!caption) {
            throw new CustomError("Post text is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get the object of user using userId
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 400);
        }
        // Allow visibility for visibility validation
        const allowedVisibility = ['public', 'friends'];
        // throw error if a use posted different thing
        if (!allowedVisibility.includes(visibility)){
            visibility = 'friends';
        }
        // create post with caption
        const newPost = new Post({
            user:userId,
            visibility,
            caption,
        });

        // save the newPost in Post table
        await newPost.save();
        // add the posts in user Id as it is being referrence
        user.posts.push(newPost._id);
        // save the user table
        await user.save();

        res.status(201).json({message:"Post created successfully!", post:newPost});
    } catch (error) {
        next(error);
    }
}

const createPostWithImageController = async (req, res, next) => {
    try {
        // get caption from body
        let { caption, visibility } = req.body;
        // get image from files
        const images = req.imageUrls;
        // throw error if any of the input is empty
        if (!caption && !images){
            throw new CustomError("Image or text is required", 400);
        }
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
        // Allow visibility for visibility validation
        const allowedVisibility = ['public', 'friends'];
        // throw error if a use posted different thing
        if (!allowedVisibility.includes(visibility)){
            visibility = 'friends';
        }
        // Map to extract only secure_url and ensure it is an array
        const secureUrls = Array.isArray(images)
        ? images.map(image => image.secure_url) : [];
        // create newpost with images and caption
        const newPost = new Post({
            user:userId,
            caption,
            visibility,
            image:secureUrls
        });

        // save new post
        await newPost.save();

        // save post in user post array
        user.posts.push(newPost._id);
        // save the user
        await user.save();

        res.status(201).json({message:"Post Created Successfully!", post:newPost});

    } catch(error) {
        next(error);
    }
}

const updatePostController = async (req,res,next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        let userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // extract postId from url
        const { postId } = req.params;
        const { caption } = req.body;
        // throw error if postId is not in url
        if (!postId){
            throw new CustomError("PostId is missing", 400);
        }
        // return if no caption
        if (!caption){
            res.status(200).json({message:"No change done"});
        }
        // check if postId in Post
        const postToUpdate = await Post.findById(postId);
        // throw error if not found
        if (!postToUpdate) {
            throw new CustomError("Post not found!", 400);
        }
        // check if the logged user is the creator of post
        if (postToUpdate.user.toString() !== userId.toString()){
            throw new CustomError("You can't change this post", 403);
        }
        // the new caption becomes the caption
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { caption },
            { new: true }
        );

        // update post
        await postToUpdate.save();

        res.status(200).json({message:"Post Updated successfully", post:updatedPost});
    } catch (error) {
        next(error);
    }
}

const updatePostVisibilityController = async (req,res,next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        let userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // extract postId from url
        const { postId } = req.params;
        let { visibility } = req.body;
        // throw error if postId is not in url
        if (!postId){
            throw new CustomError("PostId is missing", 400);
        }
        // return if no caption
        if (!visibility){
            res.status(200).json({message:"No change done"});
        }
        // Allow visibility for visibility validation
        const allowedVisibility = ['public', 'friends'];
        // throw error if a use posted different thing
        if (!allowedVisibility.includes(visibility)){
            res.status(200)
            .json({message:"it was not updated, you can only change to public or friends"});
        }
        // check if postId in Post
        const postToUpdate = await Post.findById(postId);
        // throw error if not found
        if (!postToUpdate) {
            throw new CustomError("Post not found!", 400);
        }
        // check if the logged user is the creator of post
        if (postToUpdate.user.toString() !== userId.toString()){
            throw new CustomError("You can't change this post", 403);
        }
        // the new caption becomes the caption
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { visibility },
            { new: true }
        );

        // update post
        await postToUpdate.save();

        res.status(200).json({message:"Post Updated successfully", post:updatedPost});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPostController,
    createPostWithImageController,
    updatePostController,
    updatePostVisibilityController,
}