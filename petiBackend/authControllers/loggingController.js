const jwt = require('jsonwebtoken')
const { CustomError } = require('../middlewares/error');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const loginController = async (req, res, next) => {
    try{
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
            throw new CustomError("User not found!", 404);
        }

        // if user is not verified
        if (!user.isVerified){
          throw new CustomError("Verify your account or register", 404);
        };

        // verify the password of user found with sent password
        const match = await bcrypt.compare(req.body.password, user.password);

        // if the password don't match throw error
        if(!match) {
            throw new CustomError("Wrong Credentials!", 401)
        }

        const {password,...data}=user._doc;
        // creating a jwt token and expires time in it
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES});
        // storing the token in the cookie
        res.cookie("token",token).status(200).json(data);
    } catch(error) {
        next(error);
    }
    }
    catch(error){
      res.status(500).json(error)
    }
  }


const fetchUserController = async(req, res, next) => {
   // get token from the cookies
   const token = req.cookies.token;
   // verify the token with jwt verify and send error if not verified
   jwt.verify(token,process.env.JWT_SECRET, {}, async(err,data) => {
       if(err){
           throw new CustomError(err, 404);
       }
       try{
           const id = data._id;
           // find the id of the user found in the token
           const user = await User.findOne({_id:id});
           // return the user info
           res.status(200).json(user);
       } catch(error) {
           next(error);
       }
   });
  }


const logoutController = async (req, res, next) => {
    try{
      res.clearCookie("token", {
        sameSite: "none",
        secure: true
      })
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