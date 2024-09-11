const User = require('../models/User');
const { CustomError } = require('../middlewares/error');


const uploadProfilePictureController = async (req, res, next) => {
    try {
        // extract the file uploaded from request file processed in multer
        const { filename } = req.file;
        // throw error if not found
        if (!filename) {
            throw new CustomError("Profile Picture is required", 400);
        }
        // get the image url of the file uploaded in cloudinary
        const imageUrl = req.imageUrl
        // check if cloudinary was able to upload and get url
        if (!imageUrl) {
            throw new CustomError("Image was not uploaded", 500);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if user exist
        const user = await User.findById(logId);
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 401);
        }
        // throw error if user is not verified
        if (!user.isVerified){
            throw new CustomError("User does not exist", 403);
        }
        // get the update the user object using the userId
        // updating only the generated file url in the file
        // new:true ensures it can create as many
        await User.findByIdAndUpdate(logId, {profilePicture:imageUrl},{new:true});
        
        res.status(200).json({message:"Profile picture updated successfully"});

    } catch (error) {
        next(error);
    }
}

const uploadCoverPictureController = async (req, res, next) => {
    // get the userId from url
    const { userId } = req.params;
    // extract the file uploaded from request file
    const { filename } = req.file;
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
        // get the update the user object using the userId
        // updating only the generated file url in the file
        // new:true ensures it can create as many
        const user = await User.findByIdAndUpdate(userId, {coverPicture:generateFileUrl(filename)},{new:true});
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        res.status(200).json({message:"Cover picture updated successfully", user});

    } catch (error) {
        next(error);
    }
}


module.exports = {
    uploadProfilePictureController,
    uploadCoverPictureController,
}