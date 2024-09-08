const generateOTP = async () => {
    try {
        // generate a random six digit all the time
        return (otp = `${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (error) {
        throw error;
    }
}

module.exports = generateOTP;