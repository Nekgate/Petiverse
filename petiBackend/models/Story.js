const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type:String,
    required:false
  },
  createdAT: {
    type: Date,
    default: Date.now
  }
})

const Story = mongoose.Model("Story",storySchema)

module.exports = Story