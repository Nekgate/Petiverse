const dotenv = require('dotenv');
const cloudinaryModule = require('cloudinary');

// configure the dotenv
dotenv.config()
const cloudinary = cloudinaryModule.v2;

// config the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

module.exports = cloudinary;