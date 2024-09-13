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

        // Get the image URL from Cloudinary (if file uploaded)
        const imageUrl = req.imageUrl;

        // // Ensure that only one of text or image is provided (not both)
        // if (text && imageUrl) {
        //     throw new CustomError("You can only upload either text or image, not both", 400);
        // }

        // Ensure that either text or image is provided
        if (!text.trim() && !imageUrl) {
            throw new CustomError("Either text or image must be provided", 400);
        }
                
        // create new story
        const newStory = new Story({
            text,
            image:imageUrl,
            user:userId,
        });
        // session add the story and save
        await newStory.save();

        res.status(201).json(newStory);
    } catch(error) {
        next(error);
    }
};

module.exports = createStoryController;