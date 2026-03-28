import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required !"],
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      unique: [true, "User with email already exists !"],
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
      select: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
