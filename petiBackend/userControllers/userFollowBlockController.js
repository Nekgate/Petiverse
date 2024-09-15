const User = require('../models/User');
const { CustomError } = require("../middlewares/error");

const followUserController = async (req, res, next) => {
    try {
        // get the userId from url
        const { userId } = req.params;
        // throw error if params is not available
        if (!userId){
            throw new CustomError("User Id is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
        // if both user and id are same abort
        if (userId==id){
            throw new CustomError("You cannot follow yourself", 400);
        }
        // get the user to be followed object
        const userToFollow = await User.findById(userId);
        // get the user following object
        const loggedInUser = await User.findById(id);
        // if followed user or following user not found throw error
        if (!userToFollow || !loggedInUser) {
            throw new CustomError("User not found", 404);
        }
        // throw error if user is not verified
        if (!userToFollow.isVerified){
            throw new CustomError("User is not verified", 401);
        }
        // if the following user is already following each other throw error
        if (userToFollow.blocklist.includes(userId)) {
            throw new CustomError("You are bared to follow this user!", 400);
        }
        // if the following user is already following each other throw error
        if (loggedInUser.following.includes(userId)) {
            throw new CustomError("Already following this user!", 400);
        }
        // add the user info to both users
        loggedInUser.following.push(userId);
        userToFollow.followers.push(id);
        // save the users info to database
        await loggedInUser.save();
        await userToFollow.save();
        // return response
        res.status(201).json({message:"Successfully followed user!"});
    } catch(error) {
        next(error);
    }
}

const unfollowUserController = async (req, res, next) => {
    try {
        // get the userId from url
        const { userId } = req.params;
        // throw error if params is not available
        if (!userId){
            throw new CustomError("User Id is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // if both user and id are same abort
        if (userId==logId){
            throw new CustomError("You cannot unfollow yourself", 500);
        }
        // get the user to be followed object
        const userToUnFollow = await User.findById(userId);
        // get the user following object
        const loggedInUser = await User.findById(logId);
        // if followed user or following user not found throw error
        if (!userToUnFollow || !loggedInUser) {
            throw new CustomError("User not found", 401);
        }
        // check if user to follow is verified
        if (!userToUnFollow.isVerified){
            throw new CustomError("User is not verified", 403);
        }
        // if the following user is not following each other throw error
        if (!loggedInUser.following.includes(userId)) {
            throw new CustomError("Not following this user!", 400);
        }
        // remove the user info to both users
        loggedInUser.following=loggedInUser.following.filter(id=>id.toString()!==userId);
        userToUnFollow.followers=userToUnFollow.followers.filter(id=>id.toString()!==logId);
        // save the users info to database
        await loggedInUser.save();
        await userToUnFollow.save();
        // return response
        res.status(201).json({message:"Successfully unfollowed user!"});
    } catch(error) {
        next(error);
    }
}

const blockUserController = async (req, res, next) => {
    try {
        // get the userId from url
        const { userId } = req.params;
        // throw error if params is not available
        if (!userId){
            throw new CustomError("User Id is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // if both user to be blocked and user blocking is same
        // return error
        if (userId === logId) {
            throw new CustomError("You can not block yourself", 401);
        }
        // get the object of userId to be blocked
        const userToBlock = await User.findById(userId);
        // get of object of id of user blocking
        const loggedInUser = await User.findById(logId);

        // if the logged or user to be block is not found
        // throw error
        if (!loggedInUser || !userToBlock) {
            throw new CustomError("User not found!", 404);
        }
        // throw error if user to be block is not verified
        if (!userToBlock.isVerified){
            throw new CustomError("You can't block unverified user", 403)
        }
        // if user to belock is already in the logged user
        // blocklist throw error
        if (loggedInUser.blocklist.includes(userId)) {
            throw new CustomError("This user is already blocked", 404);
        }

        // if it not in the blocklist and available
        // add to loggedIn User blocklist
        loggedInUser.blocklist.push(userId);

        // if the block list is in following of loggedIn User unfollow
        loggedInUser.following=loggedInUser.following.filter(id=>id.toString()!==userId);
        userToBlock.followers=userToBlock.followers.filter(id=>id.toString()!==logId);

        // save both of the users
        await loggedInUser.save();
        await userToBlock.save();

        res.status(200).json({message:"User is Blocked successfully!"});

    } catch(error) {
        next(error);
    }
}

const unblockUserController = async (req, res, next) => {
    try {
        // get the userId from url
        const { userId } = req.params;
        // throw error if params is not available
        if (!userId){
            throw new CustomError("User Id is required", 400);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // if both user to be unblocked and user ubblocking is same
        // return error
        if (userId === logId) {
            throw new CustomError("You can not unblock yourself", 500);
        }
        // get the object of userId to be unblocked
        const userToUnBlock = await User.findById(userId);
        // get of object of id of user unblocking
        const loggedInUser = await User.findById(logId);

        // if the logged or user to be unblock is not found
        // throw error
        if (!loggedInUser || !userToUnBlock) {
            throw new CustomError("User not found!", 404);
        }

        // throw error if user to be block is not verified
        if (!userToUnBlock.isVerified){
            throw new CustomError("You can't block unverified user", 403)
        }
        // if user to be unblock is not in the logged user
        // blocklist throw error
        if (!loggedInUser.blocklist.includes(userId)) {
            throw new CustomError("This user is not blocked by you", 404);
        }

        // remove the userId from the block list
        loggedInUser.blocklist=loggedInUser.blocklist.filter(id=>id.toString()!==userId);


        // save the users
        await loggedInUser.save();

        res.status(200).json({message:"User is Unblocked successfully!"});

    } catch(error) {
        next(error);
    }
}


module.exports = {
    followUserController,
    unfollowUserController,
    blockUserController,
    unblockUserController
}