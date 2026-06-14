import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ["INR", "JPY", "USD"],
    default: "INR",
  },
});

export default priceSchema
