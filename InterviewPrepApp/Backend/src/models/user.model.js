const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "User with username already exists!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "User with email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
