import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "User with this username already exists !"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "User with this email already exists !"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
      minlength: 5,
    },
    verified: {
      type: Boolean,
      defualt: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
