const jwt = require('jsonwebtoken');

// Function to generate a JWT with user_id for verification and set it as a cookie
const generateTokenAndSetCookie = (res, userId) => {
    
    // Generate a JWT (JSON Web Token) using the user's ID and a secret key
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "6h", // Token will expire in 6 hour
    });

    // Set the generated JWT as a cookie in the HTTP response
    res.cookie("token", token, {
        httpOnly: true, // Cookie can only be accessed by the server (not client-side scripts)
        secure: process.env.NODE_ENV === "production", // Set cookie as secure only if in production
        sameSite: "strict", // Prevents CSRF by only sending the cookie for same-site requests
        maxAge: 6 * 60 * 60 * 1000, // Set cookie expiration to 1 hour (in milliseconds)
    });

    // Return the generated token (if needed for further use)
    return token;
};


module.exports = generateTokenAndSetCookie;