const { CustomError } = require('../middlewares/error');
const User = require('../models/User');


const updateUserController = async (req, res, next) => {
    try {
        // get update data from body of form
        const updateData = req.body;
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // Only allow updates to bio and fullname
        const allowedFields = ['bio', 'fullname'];
        const filteredUpdateData = {};

        // Filter updateData to only include allowed fields
        Object.keys(updateData).forEach((key) => {
            if (allowedFields.includes(key)) {
                filteredUpdateData[key] = updateData[key];
            }
        });

        // Check if there's any valid data to update
        if (Object.keys(filteredUpdateData).length === 0) {
            throw new CustomError('Only bio and fullname can be updated', 400);
        }

        // Find the user by userId
        const userToUpdate = await User.findById(userId);

        // If user not found, throw an error
        if (!userToUpdate) {
            throw new CustomError('User not found', 404);
        }

        // Assign the filtered update data to the user
        Object.assign(userToUpdate, filteredUpdateData);
        // save to database
        await userToUpdate.save();
        // send response successfully
        res.status(200).json({message:"User updated Successfully!", user:{
            ...userToUpdate._doc,
            password:undefined,
            phoneNumber:undefined,
            email:undefined
        }});
    } catch(error) {
        next(error);
    }
};

module.exports = updateUserController;