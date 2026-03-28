import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    productId: {
      type: String,
      unique: true,
      required: true,
    },
    rounds: [
      {
        userMsg: String,
        aiMsg: String,
        offeredPrice: Number,
      },
    ],
    finalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
    },
  },
  { timestamps: true },
);


sessionSchema.index({ user: 1, productId: 1 }, { unique: true })
const sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;