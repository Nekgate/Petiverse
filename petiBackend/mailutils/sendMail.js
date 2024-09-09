const dotenv = require('dotenv');
const { VERIFICATION_EMAIL_TEMPLATE } = require('./emailTemplate');
const { transporter } = require('./mail.config');
dotenv.config();
const { AUTH_EMAIL } = process.env;

const sendVerificationEmail = async (email, verificationToken) => {
    const receiver = email;
    // setup e-mail data
    const mailOptions = {
        from: AUTH_EMAIL,
        to: receiver,
        subject:"Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationToken}', verificationToken),
        category:"Email Verification"
    };
    try {
        // send mail with defined transport object
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
        throw new Error(`Error sending verification email: ${error}`);
    }

}

module.exports = sendVerificationEmail;