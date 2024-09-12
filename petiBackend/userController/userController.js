const { CustomError } = require("../middlewares/error")
const User = require("../models/User")

const getUserController = async(req, res, next) => {
  const {userId} = req.params
  try{
    const user = await User.findById(userId)
    if(!user) {
      throw new CustomError("No user found!", 404)
    }

    const {password, ...data} = user._doc
    res.status(200).json(data)
  }
  catch(error) {
    next(error)
  }

}

const updateUserController = async (req, res, next) => {

  const {userId} = req.params
  const updateData = req.body
  try{
  
    const userToUpdate = await User.findById(userId)
    if(!userToUpdate) {
      throw new CustomError("User not found!", 404)
    }

    Object.assign(userToUpdate, updateData)

    await userToUpdate.save()

    res.status(200).json({message: "User updated successfully!", user: userToUpdate})
  }
  catch(error) {
    next(error)
  }
}

const followUserController = async(req, res, next) => {
  const {userId} = req.params
  const {_id} = req.body

  try{
    if(userId === _id) {
      throw new CustomError("You cannot follow yourself!", 400)
    }

    const userToFollow = await User.findById(userId)
    const loggedInUser = await User.findById(_id)

    if(!userToFollow || !loggedInUser) {
      throw new CustomError("User not found!", 404)
    }

    if(loggedInUser.following.includes(userId)){
      throw new CustomError("Already following user!", 400)
    }

    loggedInUser.following.push(userId)
    userToFollow.followers.push(_id)

    await loggedInUser.save()
    await userToFollow.save()

    res.status(200).json({message: "Succesfully follow the user!"})
  }
  catch(error) {
    next(error)
  }
}

const unfollowUserController = async(req, res, next) => {
  const {userId} = req.params
  const {_id} = req.body

  try{
    if(userId === _id) {
      throw new CustomError("You cannot unfollow yourself!", 400)
    }

    const userToUnfollow = await User.findById(userId)
    const loggedInUser = await User.findById(_id)


    if(!userToUnfollow || !loggedInUser) {
      throw new CustomError("User not found!", 404)
    }

    if(loggedInUser.following.includes(userId)) {
      throw new CustomError("Not following this user!", 400)
    }

    loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId)
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== _id)

    userToUnfollow.followers.push(_id)

    await loggedInUser.save()
    await userToUnfollow.save()

    res.status(200).json({message: "Succesfully unfollow the user!"})
  }
  catch(error) {
    next(error)
  }
}

const blockUserController = async(req, res, next) => {
  const {userId} = req.params
  const {_id} = req.body
  try{
    if(userId === _id) {
      throw new CustomError("You cannot block yourself", 400)
    }

    const userToBlock = await User.findById(userId)
    const loggedInUser = await User.findById(_id)

    if(!userToBlock || !loggedInUser) {
      throw new CustomError("User not found", 404)
    }

    if(loggedInUser.blocklist.includes(userId)) {
      throw new CustomError("This user is already blocked", 400)
    }

    loggedInUser.blocklist.push(userId)
    
    loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId)
    userToBlock.followers = userToBlock.followers.filter(id => id.toString() !== _id)

    await loggedInUser.save()
    await userToBlock.save()

    res.status(200).json({message: "Succesfully blocked user"})
  }
  catch(error) {
    next(error)
  }
}

module.exports = { getUserController, updateUserController,
  followUserController, unfollowUserController, blockUserController }