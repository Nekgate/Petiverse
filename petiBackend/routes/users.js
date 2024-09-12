const express = require("express")
const router = express.Router()
const { getUserController, updateUserController, followUserController,
  unfollowUserController, blockUserController } = require('../userController/userController')

// GET USER
router.get("/:userId", getUserController)

// UPDATE USER
router.put("/update/:userId", updateUserController)

// FOLLOW USER
router.post("/follow/:userId", followUserController)

// UNFOLLOW USER
router.post("/unfollow/:userId", unfollowUserController)

// BLOCK USER
router.post("/block/:user", blockUserController)

// UNBLOCK USER

module.exports = router
