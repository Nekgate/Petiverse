const { CustomError } = require("../middlewares/error");

// function that validates phonenumber
function validatePhoneNumber(phoneNumber) {
    // Remove any non-numeric characters 
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // check for validity of number
    if (cleanedNumber.length < 6 || cleanedNumber > 12) {
        throw new Error("Phone number is not valid.");
    } else {
        // Check if the first number is 0, and remove it if true
        if (cleanedNumber[0] === '0') {
            // Remove the leading '0'
            const formattedNumber = cleanedNumber.substring(1);
            cleanedNumber = formattedNumber
            return cleanedNumber;
        }
    }
     // Return valid phone number
    return cleanedNumber; 
}

module.exports = validatePhoneNumber;