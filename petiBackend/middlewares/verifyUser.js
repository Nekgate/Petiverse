const { CustomError } = require("./error");

// Middleware: Verify if the user is authenticated and authorized to perform the action
const verifyUser = (req, res, next) => {
    const userId = req.params.userId; // The user ID in the request (e.g., from the URL)
    
    // Compare the userId from the token (req.userId) and the userId from the request
    if (req.userId !== userId) {
        return next(new CustomError("You are not authorized to perform this action!", 403));
    }
    
    // If the user is authorized, proceed
    next();
};

module.exports = verifyUser;