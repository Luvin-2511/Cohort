import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
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
      required: function(){
        return !this.googleId
      },
    },
    contactNumber: {
      type: Number,
      required: [false,"Contact Number is required"],
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default:"buyer"
    },
    googleId: {
      type: String,
    },
    profilePic: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model('user',userSchema)

export default userModel;