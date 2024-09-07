const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/error");

const registerContoller = async (req, res, next) => {
    // getting all the input from the request body
    const {password, confirmPassword, username, email, phoneNumber}=req.body;
    try{
        // check if any input is empty and throw error
        if (password == "" || confirmPassword == "" || username == "" || email == "" || phoneNumber == "") {
            throw new CustomError("Invalid Credential", 404);
        }
        // check if password and confirmPassword is not the same and throw error
        if (!password === confirmPassword) {
            throw new CustomError("Password not the same", 404)
        }
        // check if user didnt start with string
        // check if user used anything apart from number, underscore,hyphen and string
        if (!/^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(username)){
            throw new CustomError("Invalid Username", 404);
        }
        // check if user added invalid email protoype ensuring the .com or .co.uk is accepted
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw new CustomError("Invalid Email", 404);
        }
        // check if the length of password is less than 8 char
        if (password.length < 8){
            throw new CustomError("password must be upto 8 character", 404);
        }
        // check to ensure uppercase, lowercase, number and special character is in the password
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            throw new CustomError("Password should contain upper&lower case, num, special char", 404);
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
        const { confirmPassword, ...data } = req.body;
        // add the data to the database
        const newUser=new User({...data,password:hashedPassword});
        // save the information
        const savedUser=await newUser.save();
        // remove email, phoneNumber, password
        const { email, password, phoneNumber,...savedData} = savedUser;
        // display other information 
        res.status(201).json(...savedData);
    } catch(error) {
        next(error);
    }
}


module.exports = {
    registerContoller
}