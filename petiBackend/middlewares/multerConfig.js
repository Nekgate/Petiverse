const multer = require('multer');
const { CustomError } = require('./error');

// Define allowed file types
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG'];

// Setup file filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        // Reject the file
        cb(new CustomError("Invalid file type. Only JPEG, JPG, and PNG are allowed."), false);
    }
};

// Configure multer to use memory storage
const storage = multer.memoryStorage();

/// Multer setup without local storage
const upload = multer({
    storage: storage, // Use memory storage to hold files as buffers
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
    }
});

module.exports = upload;