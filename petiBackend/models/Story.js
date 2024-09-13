const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  text: {
    type: String,
    default:"",
    trim: true
  },
  image: {
    type:String,
    default: "",
  },
  createdAT: {
    type: Date,
    default: Date.now
  }
})

const Story = mongoose.model("Story",storySchema)

module.exports = Story