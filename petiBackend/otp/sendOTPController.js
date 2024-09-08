const OTP = require('./models');
const { CustomError } = require("../middlewares/error");
const generateOTP = require('./generateOTPController');
const sendEmail = require('../utils/sendEmail');
const hashData = require('../utils/hashData');
const { AUTH_EMAIL } = process.env;


const sendOTPController = async ({ email, subject, message, duration = 10 }) => {
    try {
        // validate the email, subject and message
        if (!(email && subject && message)){
            throw new CustomError("Provide values for email, subject, message", 400);
        }
        // delete all old records
        await OTP.deleteOne({ email });
        // generate new pin 
        const generatedOTP = await generateOTP();
        // information required for the mail
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html:`<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} minutes</b>.</p>`,
        };
        // import sendEmail and send message with
        await sendEmail(mailOptions);
        // hash the otp created
        const hashedOTP = await hashData(generatedOTP);
        // save the data into database
        const newOTP = await new OTP({
            email,
            otp:hashedOTP
        });
        // save the newOTP to database
        const createdOTPRecord = await newOTP.save();

        // 
        return createdOTPRecord;
        
    } catch(error) {
        throw error;
    }
}

module.exports = { sendOTPController };