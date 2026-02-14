const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please fill the username !"],
    unique: [true, "Username already exists !"],
  },
  email: {
    type: String,
    required: [true, "Please fill the username !"],
    unique: [true, "Username already exists !"],
  },
  password: {
    type: String,
    required: [true, "Please fill the username !"],
  },
});

const userModel = mongoose.model("userAuth",userSchema)

module.exports = userModel
