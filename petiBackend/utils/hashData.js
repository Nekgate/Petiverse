const bcrypt = require("bcrypt");
const { CustomError } = require("../middlewares/error")

// hash data function accept data and hash it with 16
const hashData = async (data, saltRounds = 16) => {
    try {
        // hash the data given
        const hashedData = await bcrypt.hash(data, saltRounds);
        // return the data
        return hashData;
    } catch(error) {
        // throw error if any issue
        throw error
    }
}

module.exports = hashData;