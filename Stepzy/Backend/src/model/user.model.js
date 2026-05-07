import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required !"],
  },
  email: {
    type: String,
    required: [true, "Full name is required !"],
    unique: true,
  },
  contactNo: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
