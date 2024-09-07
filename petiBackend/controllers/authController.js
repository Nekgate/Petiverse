const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/error");
const validatePhoneNumber = require("../utils/phoneAuth");

const registerContoller = async (req, res, next) => {
    try{
        // getting all the input from the request body
        var { username, fullname, email, phoneNumber, password, confirmPassword }= req.body;

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
        var cleanedNumber = phoneNumber.replace(/\D/g, '');

        if (cleanedNumber[0] === '0') {
            // Remove the leading '0'
            cleanedNumber = cleanedNumber.substring(1);
            return cleanedNumber;
        }

        // Check the cleaned number again for the valid length
        if (cleanedNumber.length < 7 || cleanedNumber.length > 15) {
            throw new CustomError("Phone number is not valid after cleaning.");
        }

        // Validate the phone number format using a regular expression
        if (!/^\+?\d{7,15}$/.test(cleanedNumber)) {
            throw new CustomError("Invalid phone number format.", 400);
        }

        if (fullname < 2 || !/^[a-zA-Z]+$/.test(fullname)) {
            throw new CustomError("Name of pet should be more than 2 and only string")
        }

        // check if email or username exist in database
        const existingUser=await User.findOne({ $or: [{username}, {email}] });
        // if they exist throw error
        if (existingUser){
            throw new CustomError("Username or Email already exists!", 400);
        }
        // use bcrypt for hashing
        const salt = await bcrypt.genSalt(16);
        // hash the password
        const hashedPassword = await bcrypt.hashSync(password, salt);
        // destructure to remove confirm password
        var { confirmPassword, ...data } = req.body;
        // add the data to the database
        const newUser=new User({...data,password:hashedPassword, phoneNumber:cleanedNumber});
        // save the information
        const savedUser=await newUser.save();
        // remove email, phoneNumber, password
        var { email, password, phoneNumber,...savedData} = savedUser;
        // display other information 
        res.status(201).json(...savedData);
    } catch(error) {
        next(error);
    }
}


module.exports = {
    registerContoller
}