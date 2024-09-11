const { CustomError } = require('../middlewares/error');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');

const loginController = async (req, res, next) => {
  try{
    let user;
    // from the json data send check if the user with
    // the email or username exist
    if (req.body.email){
      user=await User.findOne({email:req.body.email})
    } else {
      user=await User.findOne({username:req.body.username});
    }
    
    // return error if no user have same email
    if(!user) {
      throw new CustomError("Invalid credentials!", 400);
    }

    // if user is not verified
    if (!user.isVerified){
      throw new CustomError("Verify your account or register", 404);
    };

    // verify the password of user found with sent password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    // if the password don't match throw error
    if(!isPasswordValid) {
      throw new CustomError("Incorrect Password!", 401)
    }

    // creating a jwt token and expires time in it
    generateTokenAndSetCookie(res, user._id);
    // update last login code of the user
    user.lastLogin = new Date();
    // storing the token in the cookie
    res.status(200).json({
      message:"Logged in successfully",
      user:{
        ...user._doc,
        password: undefined,
        email: undefined,
        phoneNumber:undefined
      }
    });
  } catch(error) {
    next(error);
  }
}


const fetchUserController = async (req, res, next) => {
  // get token from the cookies
  const token = req.cookies.token;
   // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }
  // verify the token with jwt verify and send error if not verified
  jwt.verify(token,process.env.JWT_SECRET, {}, async (err, data) => {
    // if error thow the error
    if(err){
      throw new CustomError(err, 403);
    }
    try{
      // get the user Id from the cookie
      const id = data.userId;
      // find the id of the user found in the token
      const user = await User.findOne({_id:id});
      // return the user info
      res.status(200).json({user:{
        ...user._doc,
        password: undefined,
        email: undefined,
        phoneNumber: undefined
      }});
    } catch(error) {
      next(error);
    }
  })
};


const logoutController = async (req, res, next) => {
  try{
    res.clearCookie("token")
    .status(200)
    .json("User logged out successfully!")
  }
  catch(error){
    next(error);
  }
}

module.exports = {
    loginController,
    fetchUserController,
    logoutController,
}