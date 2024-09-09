const { CustomError } = require("../middlewares/error");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate reset token function
const generateResetToken = (user) => {
    console.log(user.email, user._id);
    // Token expiry environment variable name to be more meaningful
    return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_1 });
};

const verifyResetToken = async (token) => {
    // async/await handling within jwt.verify
    if (!token) {
        throw new CustomError("No token provided", 400);
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user exists in the database
        const user = await User.findOne({ email: decodedToken.email });
        if (!user) {
            throw new CustomError("Invalid email address", 400);
        }

        // Return relevant user data or the decoded token
        return {
            isValid: true,
            email: decodedToken.email,
            user
        };
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
        console.log("Reset Link", `${process.env.URL}/api/v1/auth/verify-token?resetToken=${resetToken}`);
        
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

const verifyTokenPasswordController = async (req, res, next) => {
    // get the token from the url
    const { resetToken } = req.query
    console.log(resetToken);
    try {
        // check if token is empty
        if (!resetToken){
            throw new CustomError("Token is missing", 400);
        }
        // verify the token
        const isToken = await verifyResetToken(resetToken);
        // throw error if it is not valid
        if (!isToken) {
            throw new CustomError("Invalid Token or expires", 404);
        }
        
        res.status(200).json({ message: "Token is verified", email: isToken.email});
    } catch(error) {
        next(error);
    }
}

const resetPasswordController = async (req, res, next) => {
    // get the token and password from user
    const { resetToken, password, confirmPassword } = req.body;
    try {
        if (!(resetToken && password && confirmPassword)) {
            throw new CustomError("Credentials are invalid", 400);
        }
        const isToken = await verifyResetToken(resetToken);
        if (!isToken){
            throw new CustomError("Token expired or invalid", 400);
        }
        // check if password and confirmPassword is not the same and throw error
        if (password !== confirmPassword) {
            throw new CustomError("Password not the same", 400);
        }
        // check if the length of password is less than 8 char
        if (password.length < 8){
            throw new CustomError("password must be upto 8 character", 400);
        }
        // check to ensure uppercase, lowercase, number and special character is in the password
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            throw new CustomError("Password should contain upper&lower case, num, special char", 400);
        }
        const user = await User.findOne({email:isToken.email})
        if (user.resetToken !== resetToken){
            throw new CustomError("Your not the user of this reset token", 401);
        }
        // use bcrypt for hashing
        const salt = await bcrypt.genSalt(16);
        // hash the password
        const hashedPassword = await bcrypt.hashSync(password, salt);
        // add the data to the database
        user.password = hashedPassword;
        user.resetToken = "";
        await user.save();

        res.status(200).json("Password reset successfully")
    } catch(error) {
        next(error);
    }
}

module.exports = {
    forgotPasswordController,
    resetPasswordController,
    verifyTokenPasswordController,
};
