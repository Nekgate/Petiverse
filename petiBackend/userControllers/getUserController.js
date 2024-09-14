const User = require("../models/User");
const { CustomError } = require("../middlewares/error");

const getAllUsersVerifiedController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
        // Get all verified users from the database
        const users = await User.find({ isVerified: true })
        .cache(userId).sort(-createdAt);

        // Remove sensitive fields for each user
        const foundUsers = users.map(user => {
            const { password, phoneNumber, email, ...safeUserData } = user.toObject(); // Convert Mongoose document to plain JS object
            return safeUserData;
        });

        // Send the response with the sanitized user data removing sensitive data
        res.status(200).json({
            message: "All Verified Users",
            foundUsers
        });
    } catch(error) {
        next(error);
    }
}

const getAllNotUsersVerifiedController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
        // Get all verified users from the database
        const users = await User.find({ isVerified: false });

        // Remove sensitive fields for each user
        const foundUsers = users.map(user => {
            const { password, phoneNumber, email, ...safeUserData } = user.toObject(); // Convert Mongoose document to plain JS object
            return safeUserData;
        });

        // Send the response with the sanitized user data removing sensitive data
        res.status(200).json({
            message: "All users not verified",
            foundUsers
        });
    } catch(error) {
        next(error);
    }
}

const getUserController = async (req, res, next) => {
    // get the userId in link parameter provided
    const { userId } = req.params;
    // throw error if no url params
    if (!userId) {
        throw new CustomError("You can't find a user without an Id", 404);
    }
    try {
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
        // find the id in the database if it exist
        const user = await User.findById(userId);
        // if it don't exist
        if (!user) {
            throw new CustomError("No user found", 404);
        }
        // check if user is authenticated or throw error
        if (!user.isVerified == true) {
            throw new CustomError("No User found", 401);
        }

        // if user exist the exclude password, phoneNumber, and email get the data from user
        res.status(200).json({user:{...user._doc,
            password:undefined,
            phoneNumber:undefined,
            email:undefined,
        }});
    } catch(error) {
        next(error);
    }
}

const getFollowingController = async (req, res, next) => {
    // get user from url
    const { userId } = req.params;
    // throw error if no url params
    if (!userId) {
        throw new CustomError("You can't find a user without an Id", 404);
    }
    try {
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // find the userId in the database, with other information
        const user = await User.findById(userId).populate("following","username fullName profilePicture");
        // if not found throw error
        if (!user) {
            throw new CustomError("User not found", 400);
        }
        // check if user is authenticated or throw error
        if (!user.isVerified) {
            throw new CustomError("No User found", 401);
        }
        // destructure blocklist from other data
        const {following,...data} = user;
        // response is the information in block list of user
        res.status(200).json(following);
    } catch (error) {
        next(error);
    }
}

const getFollowersController = async (req, res, next) => {
    // get user from url
    const { userId } = req.params;
    // throw error if no url params
    if (!userId) {
        throw new CustomError("You can't find a user without an Id", 404);
    }
    try {
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // find the userId in the database, with other information
        const user = await User.findById(userId).populate("followers","username fullName profilePicture");
        // if not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user is authenticated or throw error
        if (!user.isVerified) {
            throw new CustomError("No User found", 401);
        }
        // destructure blocklist from other data
        const {followers,...data} = user;
        // response is the information in block list of user
        res.status(200).json(followers);
    } catch (error) {
        next(error);
    }
}

const getBlockedUsersController = async (req, res, next) => {
    // get user from url
    const { userId } = req.params;
    // throw error if no url params
    if (!userId) {
        throw new CustomError("You can't find a user without an Id", 404);
    }
    try {
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // find the userId in the database, with other information
        const user = await User.findById(userId).populate("blocklist","username fullName profilePicture");
        // if not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user is authenticated or throw error
        if (!user.isVerified) {
            throw new CustomError("No User found", 401);
        }
        // destructure blocklist from other data
        const {blocklist,...data} = user;
        // response is the information in block list of user
        res.status(200).json(blocklist);
    } catch (error) {
        next(error);
    }
}

const searchUserController = async (req, res, next) => {
    // get the search query from url
    const { query } = req.params;
    // throw error if no url params
    if (!query) {
        throw new CustomError("Invalid input", 400);
    }
    try {
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
        // find user object using regular expression
        // check to only return verified user
        // check the query as a username or fullName
        const users = await User.find({
            isVerified:true,
            $or:[
                {username:{$regex:new RegExp(query, 'i')}},
                {fullName:{$regex:new RegExp(query, 'i')}}
            ]
        });
        // Remove sensitive fields for each user removing sensitive data
        const foundUsers = users.map(user => {
            const { password, phoneNumber, email, ...safeUserData } = user.toObject(); // Convert Mongoose document to plain JS object
            return safeUserData;
        });
        res.status(200).json({foundUsers});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserController,
    searchUserController,
    getBlockedUsersController,
    getFollowersController,
    getFollowingController,
    getAllUsersVerifiedController,
    getAllNotUsersVerifiedController,
}