const User = require("../models/User");
const bcrypt = require("bcrypt");
const { CustomError } = require("../middlewares/error");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { sendVerificationEmail } = require("../mailutils/sendMailToVerify");

const registerContoller = async (req, res, next) => {
    try{
        // getting all the input from the request body
        let { username, fullname, email, phoneNumber, password, confirmPassword }= req.body;

        // check if any input is empty and throw error
        if ( !username || !fullname || !email || !phoneNumber || !password || !confirmPassword ) {
            throw new CustomError("Invalid Credential", 400);
        }
        
        // check if user didnt start with string
        // check if user used anything apart from number, underscore,hyphen and string
        if (!/^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(username)){
            throw new CustomError("Invalid Username", 400);
        }
        // check if user added invalid email protoype ensuring the .com or .co.uk is accepted
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw new CustomError("Invalid Email", 400);
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
        // Ensure the phone number is within the valid range
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            throw new CustomError("Phone number length is not valid.");
        }

        // Remove any non-numeric characters (e.g., spaces, hyphens, dots, parentheses)
        phoneNumber = phoneNumber.replace(/\D/g, '');
        // remove the 0 if it the first number
        if (phoneNumber[0] === '0') phoneNumber = phoneNumber.substring(1);

        // Check the cleaned number again for the valid length
        if (phoneNumber.length < 7 || phoneNumber.length > 15 || !/^\+?\d{7,15}$/.test(phoneNumber)) {
            throw new CustomError("Phone number is not valid.", 400);
        }
        // check if fullname is less than 2 and allow only string and space inbetween character
        if (fullname < 2 || !/^[a-zA-Z\s]+$/.test(fullname)) {
            throw new CustomError("Name of pet should be more than 2 and only string")
        }

        // check if email or username exist in database
        const existingUser=await User.findOne({ $or: [{username}, {email}] });
        // if they exist throw error
        if (existingUser){
            throw new CustomError("Username or Email already exists!", 400);
        }
        // use bcrypt for hashing
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        // add the data to the database
        const newUser=new User({
            username,
            fullname,
            email,
            password:hashedPassword,
            phoneNumber,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 20 * 60 * 1000,
        });
        // save the information
        const savedUser=await newUser.save();
        // authenticate user with a created token
        generateTokenAndSetCookie(res, savedUser._id);
        // send email to user
        await sendVerificationEmail(savedUser.email, verificationToken);
        // remove email, phoneNumber, password
        // display other information 
        res.status(201).json({
            message:"User created Successfully",
            ...savedUser._doc,
            password:undefined,
            phoneNumber:undefined,
            email:undefined
        });
    } catch(error) {
        next(error);
    }
}


module.exports = {
    registerContoller
}