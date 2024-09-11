const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();
const { AUTH_EMAIL, AUTH_PASS } = process.env;

// create the transporter with the required configuration for gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use STARTTLS
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS 
    }
})

module.exports = { transporter };