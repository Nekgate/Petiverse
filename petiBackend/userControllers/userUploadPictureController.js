const uploadProfilePictureController = async (req, res, next) => {
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
        const user = await User.findByIdAndUpdate(userId, {profilePicture:generateFileUrl(filename)},{new:true});
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        res.status(200).json({message:"Profile picture updated successfully", user});

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