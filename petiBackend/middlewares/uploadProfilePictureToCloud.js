const multer = require('multer');
const cloudinary = require('../utils/cloudinaryConfig');
const { CustomError } = require('./error');


const uploadImage = async (req, res, next) => {
    try {
        // Access the uploaded file via Multer
        const image = req.file;

        // Throw error if no image is uploaded
        if (!image) {
            return next(new CustomError("Image is missing", 400));
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "auto",
            public_id: `user_${req.userId}_profilePicture`,  // Make public_id dynamic
            upload_preset: 'profilePicture',
        });

        // Generate auto-cropped URL for the image
        const autoCropUrl = cloudinary.url(result.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
            quality: 'auto',
            fetch_format: 'auto', // Automatically use the best format (e.g., WebP)
        });

        // Attach the image URLs to the request object for further use
        req.imageUrl = result.secure_url;
        req.autoCropUrl = autoCropUrl;
        
        console.log(req.autoCropUrl);

        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        // Pass the error to the next error handler middleware
        return next(error);
    }
};

module.exports = uploadImage;
