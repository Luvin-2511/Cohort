const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: ["true", "User with this username already exists."],
    required: ["true", "Fill this field"],
  },
  email: {
    type: String,
    unique: ["true", "User with this email already exists."],
    required: ["true", "Fill this field"],
  },
  password: {
    type: String,
    required: ["true", "Fill this field"],
  },
});

const userModel = mongoose.model("useriger", userSchema);

module.exports = userModel;
