const User = require('../models/User');
const { CustomError } = require("../middlewares/error");
const { sendWelcomeEmail } = require('../mailutils/sendMailToVerify');

const verifyEmailController = async (req, res, next) => {
    // get the token sent to user from body
    const { code } = req.body;
    try {
        // check if the token is up to six and not empty or throw error
        if (!code || code === 6) {
            throw new CustomError("The token is not complete", 400);
        }
        // check if any user has the cose
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{ $gt: Date.now() },
        });
        // throw error if no user found or expires
        if (!user) {
            throw new CustomError("Invalid token or expired token", 400);
        }
        // if it is still verified and valid
        // change verification to true
        user.isVerified = true;
        // delete verificationToken & verificationTokenExpiresAt
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        // save user
        await user.save();

        // send a welcome email
        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({message:"Successfully verified"});


    } catch(error) {
        next(error);
    }
}

module.exports = { verifyEmailController };