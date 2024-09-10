const dotenv = require('dotenv');
const { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('./emailTemplate');
const { transporter } = require('./mail.config');
dotenv.config();
const { AUTH_EMAIL } = process.env;

const sendPasswordResetEmail = async (email, resetURL) => {
    const receiver = email;
    // setup e-mail data
    const mailOptions = {
        from: AUTH_EMAIL,
        to: receiver,
        subject:"Reset Your Password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
        category:"Password Reset"
    };
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: ' + info.response);
        return info; // Return the info object if needed
    } catch(error) {
        // Handle and log errors more thoroughly
        console.error('Error sending email:', error.message);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
        throw new Error(`Error sending reset password email: ${error}`);
    }

}

const sendResetSuccessEmail = async (email, name) => {
    const receiver = email;
    // setup e-mail data
    const mailOptions = {
        from: AUTH_EMAIL,
        to: receiver,
        subject:"Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name),
        category:"Password Reset Successful"
    };
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: ' + info.response);
        return info; // Return the info object if needed
    } catch(error) {
        // Handle and log errors more thoroughly
        console.error('Error sending email:', error.message);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
        throw new Error(`Error sending password reset successful email: ${error}`);
    }

}


module.exports = {
    sendPasswordResetEmail,
    sendResetSuccessEmail
}