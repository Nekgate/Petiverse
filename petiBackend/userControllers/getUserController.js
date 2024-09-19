const User = require("../models/User");
const { CustomError } = require("../middlewares/error");
const { getValue, setValue } = require("../utils/redisConfig");

const getAllUsersVerifiedController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const id = req.userId;
        // throw error if no user Id
        if (!id) {
            throw new CustomError("You have to login first", 401);
        }
         // Define cache key
         const cacheKey = 'verified_users';

         // Check Redis cache for verified users data
         const cachedUsers = await getValue(cacheKey);
         if (cachedUsers) {
             // Return the cached users if they exist
             return res.status(200).json({
                 message: "All Verified Users (from cache)",
                 foundUsers: cachedUsers
             });
         }

        // Get all verified users from the database
        const users = await User.find({ isVerified: true });

        // Remove sensitive fields for each user
        const foundUsers = users.map(user => {
            const { password, phoneNumber, email, ...safeUserData } = user.toObject(); // Convert Mongoose document to plain JS object
            return safeUserData;
        });

        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, foundUsers, 90); // 90seconds

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
        // Define cache key
        const cacheKey = 'not_verified_users';

        // Check Redis cache for verified users data
        const cachedUsers = await getValue(cacheKey);
        if (cachedUsers) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "All Verified Users (from cache)",
                foundUsers: cachedUsers
             });
         }
        // Get all verified users from the database
        const users = await User.find({ isVerified: false });

        // Remove sensitive fields for each user
        const foundUsers = users.map(user => {
            const { password, phoneNumber, email, ...safeUserData } = user.toObject(); // Convert Mongoose document to plain JS object
            return safeUserData;
        });

        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, foundUsers, 90); // 90seconds

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
        // Define cache key
        const cacheKey = `get_users_${id}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "User (from cache)",
                user: cachedUser
             });
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
        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, {user:{...user._doc,
            password:undefined,
            phoneNumber:undefined,
            email:undefined,
        }}, 90); // 90seconds

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
        // Define cache key
        const cacheKey = `following_${logId}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "following (from cache)",
                following: cachedUser
             });
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
        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, following, 90); // 90seconds
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
        // Define cache key
        const cacheKey = `followers_${logId}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "Followers (from cache)",
                followers: cachedUser
             });
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
        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, followers, 90); // 90seconds
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
        // Define cache key
        const cacheKey = `block_${logId}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "blocked users (from cache)",
                blocklist: cachedUser
             });
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
        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, blocklist, 90); // 90seconds
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
        // Define cache key
        const cacheKey = `search_${id}`;

        // Check Redis cache for verified users data
        const cachedUser = await getValue(cacheKey);
        if (cachedUser) {
            // Return the cached users if they exist
            return res.status(200).json({
                message: "search (from cache)",
                foundUsers: cachedUser
             });
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
        // Cache the result in Redis for future requests, set expiration time 90 sec
        await setValue(cacheKey, foundUsers, 90); // 90seconds
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