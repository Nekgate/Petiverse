const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
    },
    otp:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    expiresAt:{
        type:Date,
        default: function() {
            return Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
        }
    }
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;