const bcrypt = require('bcrypt');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');
const { sendResetSuccessEmail } = require('../mailutils/sendMailToResetPassword');

const changePasswordController = async (req, res, next) => {
    // get the token from the params
    const { token } = req.params;
    // get the password and confirm password from body
    const { password, confirmPassword } = req.body;
    try {
        // throw no token throw error
        if (!token) {
            throw new CustomError("Token is required", 400);
        }
        // throw error if password and confirm password is empty
        if (!(password && confirmPassword)){
            throw new CustomError("Password is empty", 400);
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
        // get user if token is valid and expires have not expired
        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt: Date.now() },
        });
        // if both not true
        if (!user){
            throw new CustomError("Token expired or Invalid, request again", 404);
        }
        // use bcrypt for hashing
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hashSync(password, salt);
        // add the data to the database
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        // save password
        await user.save();
        await sendResetSuccessEmail(user.email, user.username);

        res.status(200).json("Password reset successfully")
    } catch(error) {
        next(error);
    }
}

module.exports = changePasswordController;