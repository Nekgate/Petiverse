const User = require('../models/User');
const Story = require('../models/Story');
const { CustomError } = require('../middlewares/error');

const createStoryController = async (req, res, next) => {
    try {
       // Get the userId from the verified token (in cookies)
        const userId = req.userId;

        // Throw error if no userId is found
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
    
        // Get text from the request body
        const { text } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        // Ensure that either text or image is provided
        if (!text) {
            throw new CustomError("text must be provided", 400);
        }
                
        // create new story
        const newStory = new Story({
            text,
            user:userId,
        });
        // session add the story and save
        await newStory.save();

        res.status(201).json(newStory);
    } catch(error) {
        next(error);
    }
};

const createStoryImageController = async (req, res, next) => {
    try {
       // Get the userId from the verified token (in cookies)
        const userId = req.userId;

        // check for image uploaded
        const image = req.imageUrl;

        // Throw error if no userId is found
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        // // Ensure that only one of text or image is provided (not both)
        // if (text && imageUrl) {
        //     throw new CustomError("You can only upload either text or image, not both", 400);
        // }

        // Ensure that either text or image is provided
        if (!image) {
            throw new CustomError("image must be provided", 400);
        }
                
        // create new story
        const newStory = new Story({
            image,
            user:userId,
        });
        // session add the story and save
        await newStory.save();

        res.status(201).json(newStory);
    } catch(error) {
        next(error);
    }
};


module.exports = {
    createStoryController,
    createStoryImageController,
};