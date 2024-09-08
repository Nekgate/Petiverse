const { CustomError } = require("../middlewares/error");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate reset token function
const generateResetToken = (user) => {
    // Token expiry environment variable name to be more meaningful
    return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_1 });
};

const verifyResetToken = async (token) => {
    // async/await handling within jwt.verify
    if (!token) {
        throw new CustomError("No token provided", 400);
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_1);
        // await should be used outside of jwt.verify
        const user = await User.findOne({ email: data.email });
        // throw error if email is invalid
        if (!user) {
            throw new CustomError("This email is invalid", 401);
        }
        
        return data.email; // returning email from token data

    } catch (err) {
        // Corrected: Changed error handling to work with both verification and token expiry errors
        throw new CustomError("Token has expired or is invalid", 401);
    }
};

const handleForgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        // error if user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        const resetToken = generateResetToken(user);

        // Updated: Better way to store and update the resetToken field
        user.resetToken = resetToken;
        await user.save(); // Updated to user.save instead of findOneAndUpdate for simplicity

        // sending email (mocking here)
        console.log("Reset Link", `${process.env.URL}/reset-password?resetToken=${resetToken}`);
        
        return true;
    } catch (error) {
        throw error;
    }
};

const forgotPasswordController = async (req, res, next) => {
    const { email } = req.body;

    try {
        // validate if email is provided and is in valid format
        if (!(email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
            throw new CustomError("Invalid email format", 400);
        }

        const anyUser = await User.findOne({ email: email });
        
        if (!anyUser) {
            throw new CustomError("No user with this email", 404); // Error status corrected
        }

        const isHandled = await handleForgotPassword(email);
        
        if (!isHandled) {
            throw new CustomError("Failed to send reset token", 500); // Added meaningful error message
        }

        res.status(200).json({ message: "Reset link has been sent to your email." });
    } catch (error) {
        next(error);
    }
};

const resetPasswordController = async (req, res, next) => {
    try {

    } catch(error) {
        next(error);
    }
}

module.exports = {
    forgotPasswordController,
    resetPasswordController,
};
