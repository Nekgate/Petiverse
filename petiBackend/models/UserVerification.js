const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    uniqueString:{
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

const UserVerification = mongoose.model("UserVerification", userVerificationSchema);

module.exports = UserVerification;