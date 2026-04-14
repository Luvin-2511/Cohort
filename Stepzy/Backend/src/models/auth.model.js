import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
    },
    contactNumber: {
      type: Number,
      required: [true,"Contact Number is required"],
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default:"buyer"
    }
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model('user',userSchema)

export default userModel;