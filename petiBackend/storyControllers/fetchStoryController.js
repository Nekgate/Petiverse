const getStoriesController = async (req, res, next) => {
    // get user id from url
    const { userId } = req.params;
    try {
       // check if user exist
       const user = await User.findById(userId);
       // throw error if not found
       if (!user){
           throw new CustomError("User not found", 404);
       }
       // get the users the user is following
       const followingUsers=user.following
       // get all the stories of users the users is following
       // arrange how best to display it
       const stories = await Story.find(
           {user:{$in:followingUsers}}
       ).populate("user", "fullName username profilePicture");

       res.status(200).json(stories);

    } catch(error) {
       next(error);
    }
}

const getUserStoriesController = async (req, res, next) => {
   // get user id from url
   const { userId } = req.params;
   try {
       // check if user exist
       const user = await User.findById(userId);
       // throw error if not found
       if (!user){
           throw new CustomError("User not found", 404);
       }
       // get the stories partaining to user
       // arrange how it will be displayed
       const stories = await Story.find(
           {user:userId}
       ).populate("user", "fullName username profilePicture");

       res.status(200).json(stories);
   } catch(error) {
       next(error);
   }
}
