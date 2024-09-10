const loginController = async (req, res, next) => {
    // getting the email and 
    try{
        let user;
        if(req.body.email){
          user=await User.findOne({email:req.body.email})
        }
        else{
          user=await User.findOne({username:req.body.username})
        }
  
        if(!user){
          return res.status(404).json("User not found!")
        }
  
        const match=await bcrypt.compare(req.body.password, user.password)
  
        if(!match){
          return res.status(401).json("Incorrect Password!")
        }
    
        const {password, ...data}=user._doc
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
        res.cookie("token", token).status(200).json(data)
    }
    catch(error){
      res.status(500).json(error)
    }
  }


const fetchUserController = async(req, res) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, async(err, decodedData) => {
      if(err){
        return res.status(401).json({ message: "Invalid or expired token", error: err })
      }
      try{
        const user = await User.findOne({_id: decodedData._id})
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        res.status(200).json(user); 
      } catch(error) {
        res.status(500).json({ message: "Server error", error });
      }
    })
  }


const logoutController = async (req, res) => {
    try{
      res.clearCookie("token", {
        sameSite: "none",
        secure: true
      })
      .status(200)
      .json("User logged out successfully!")
    }
    catch(error){
      res.status(500).json(error)
    }
  }

module.exports = {
    loginController,
    fetchUserController,
    logoutController,
}