const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Enter name in the field"],
  },
  email: {
    type: String,
    require: [true, "Enter email in the field"],
    unique: [true, "Account with email already exists !"],
  },
  password: {
    type: String,
    require: [true, "Enter email in the field"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  favorites: [{ movieID: String }],
  watchHistory: [{ movieID: String }]
});

const userModel = mongoose.model("user",userSchema)