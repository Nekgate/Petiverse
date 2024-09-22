const User = require('../models/User');
const Story = require('../models/Story');
const { CustomError } = require('../middlewares/error');
const { clearCache } = require('../utils/redisConfig');
const extractPublicId = require('../utils/extractPublicIdFromCloudinary');
const cloudinary = require('../utils/cloudinaryConfig');


const deleteAStoryController = async (req, res, next) => {
    try {
        // Get the userId from the verified token (in cookies)
        const userId = req.userId;

        // Throw error if no userId is found
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }

        // get story id from url
        const storyId = req.params.storyId;

        // check if storyId is available
        if (!storyId) {
            throw new CustomError("You forgot the storyId", 400);
        }

        // check if story exist
        const story = await Story.findById(storyId);
        // throw error if not found
        if (!story){
            throw new CustomError("Story not found", 404);
        }
        // check if user that created the story is 
        // the same user that want to delete the story
        if (story.user.toString() !== userId){
            throw new CustomError("You did not create the story", 401);
        }
        // Delete the image from Cloudinary if it exists
        if (story.image) {
            const publicId = extractPublicId(story.image);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        console.error('Error deleting image from Cloudinary:', error);
                    } else {
                        console.log('Image deleted from Cloudinary:', result);
                    }
                });
            } else {
                console.error('Public ID could not be extracted from URL:', story.image);
            }
        }
        // find and delete
        const updatedStory = await Story.findByIdAndDelete({_id:storyId});
        // Define cache key
        const cacheKey = `story_${userId}`;
        const cacheKey1 = `userStory_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

        res.status(200).json({message:"Story Deleted Successfully"});
    } catch(error) {
        next(error);
    }
}

const deleteUserStoriesController = async (req, res, next) => {
    try {
        // Get the userId from the verified token (in cookies)
        const userId = req.userId;

        // Throw error if no userId is found
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }

        // check if user exist
        const user = await User.findById(userId);
        // throw error if not found
        if (!user){
            throw new CustomError("User not found", 404);
        }
         // Find all stories by the user
         const userStories = await Story.find({ user: userId });

         // Loop through the stories and delete their images if they exist
         for (const story of userStories) {
            if (story.image) {
                const publicId = extractPublicId(story.image);  // Utility function to getCloudinary publicId
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            console.error('Error deleting image from Cloudinary:', error);
                        } else {
                            console.log('Image deleted from Cloudinary:', result);
                        }
                    });
                } else {
                    console.error('Public ID could not be extracted from URL:', story.image);
                }
            }
        }
        // find and delete
        await Story.deleteMany({user:userId});
        // Define cache key
        const cacheKey = `story_${userId}`;
        const cacheKey1 = `userStory_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

        res.status(200).json({message:"All Stories Deleted Successfully"});

    } catch(error) {
        next(error);
    }
}

module.exports = {
    deleteAStoryController,
    deleteUserStoriesController
}