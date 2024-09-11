const { CustomError } = require('../middlewares/error');
const User = require('../models/User');

const checkAuthController = async (req, res, next) => {
    try {
        // check if user in the token is existing
        const user = await User.findById(req.userId);
        // throw error if no user
        if (!user) {
            throw new CustomError("User not found", 401);
        }
        res.status(200).json({user:{
            ...user._doc,
            password: undefined,
            email: undefined,
            phoneNumber: undefined
        }})
    } catch(error) {
        throw error;
    }
}

module.exports = checkAuthController;