const getPostsController = async (req, res, next) => {
    // get the userId from the params
    const { userId } = req.params;
    try {
        // get user object
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // get all the blacklisted users from the user
        const blockedUsersIds = user.blockList.map(id=>id.toString());
        // find all the post in Post and exclude the blocked users
        // populate (display) username, fullName and Profile picture
        const allPosts = await Post.find({user:{$nin:blockedUsersIds}}).populate("user", "username fullName profilePicture");

        res.status(200).json({posts:allPosts});

    } catch (error) {
        next(error);
    }
}

const getUserPostsController = async (req, res, next) => {
    // get the userId from the params
    const { userId } = req.params;
    try {
        // get user object
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // find all the user post
        const userPosts = await Post.find({user:userId});

        res.status(200).json({posts:userPosts});

    } catch (error) {
        next (error);
    }
}
