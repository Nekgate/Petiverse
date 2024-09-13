const multer = require("multer")
const path = require("path")

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Destination where files will be stored
    destination:function (req, file, cb) {
        cb(null,"uploads/")
    },
    // Filename format for uploaded files
    filename:function(req, file, cb) {
        const ext=path.extname(file.originalname) // Get file extension
        cb(null, `${file.fieldname}-${Date.now()}${ext}`) // Set filename with timestamp
    }
})

// Create an instance of multer with the storage configuration
const upload=multer({storage:storage})

// Export the upload middleware to be used in routes
module.exports=upload;