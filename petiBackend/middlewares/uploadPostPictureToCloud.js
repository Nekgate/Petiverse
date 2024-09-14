const multer = require('multer');
const cloudinary = require('../utils/cloudinaryConfig');
const streamifier = require('streamifier');
const { CustomError } = require('./error');

// Middleware to handle uploading an array of images
const uploadImages = async (req, res, next) => {
    try {
        // Access the uploaded files via Multer
        const images = req.files;

        // Throw error if no images are uploaded
        if (!images || images.length === 0) {
            return next(new CustomError("No images uploaded", 400));
        }

        // Helper function to upload a buffer to Cloudinary
        const uploadToCloudinary = (buffer, publicId) => {
            return new Promise((resolve, reject) => {
                // Use upload_stream to upload the buffer
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        public_id: publicId,  // Make public_id dynamic
                        upload_preset: 'posts',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                // Convert the buffer to a readable stream that Cloudinary can consume
                streamifier.createReadStream(buffer).pipe(uploadStream);
            });
        };

        // Process each image
        const uploadPromises = images.map((file, index) => {
            const publicId = `user_${req.userId}_image_${index}`; // Dynamic public_id for each image
            return uploadToCloudinary(file.buffer, publicId);
        });

        // Wait for all uploads to finish
        const results = await Promise.all(uploadPromises);

        // Generate auto-cropped URLs for the images
        const imageUrls = results.map(result => ({
            secure_url: result.secure_url,
            autoCropUrl: cloudinary.url(result.public_id, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
                quality: 'auto',
                fetch_format: 'auto', // Automatically use the best format (e.g., WebP)
            })
        }));

        // Attach the image URLs to the request object for further use
        req.imageUrls = imageUrls;

        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        // Pass the error to the next error handler middleware
        return next(error);
    }
};

module.exports = uploadImages;