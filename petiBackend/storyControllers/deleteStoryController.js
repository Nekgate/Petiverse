const deleteStoryController = async (req, res, next) => {
    // get the id of story from url
    const { storyId } = req.params;
    try {
        // check if story exist
        const story = await User.findById(storyId);
        // throw error if not found
        if (!story){
            throw new CustomError("Story not found", 404);
        }
        // find and delete
        await Story.findByIdAndDelete(storyId);
        // save story
        Story.save();

        res.status(200).json({message:"Story Deleted Successfully"});
    } catch(error) {
        next(error);
    }
}

const deleteUserStoriesController = async (req, res, next) => {
    // get user id from url
    const { userId } = req.params;
    try {
        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user){
            throw new CustomError("User not found", 404);
        }
        // find and delete
        await Story.deleteMany({user:userId});

        res.status(200).json({message:"All Stories Deleted Successfully"});

    } catch(error) {
        next(error);
    }
}