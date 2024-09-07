// import mongoose to create the schema
const mongoose = require('mongoose');

// defining the schema for location
const locationSchema = new mongoose.Schema({
    country:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        trim:true
    },
    phoneCode:{
        type:String,
        required:true,
        trim:true
    }
}) 

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
