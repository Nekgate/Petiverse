const { sendOTPController } = require("./sendOTPController");

const otpController = async (req, res, next) => {
    try {
        // get the informations from the body of the message
        const { email, subject, message, duration } = req.body;
        // get the createdOTP
        const createdOTP = await sendOTPController({
            email,
            subject,
            message,
            duration,
        })
        // response
        res.status(200).json(createdOTP);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = otpController;