import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  price: {
    type: priceSchema,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required !"],
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  orderItems: [
    {
      title: String,
      description: String,
      productId: String,
      variantId: String,
      size: Number,
      quantity: Number,
      price: priceSchema,
      images: [{ url: String }],
    },
  ],
});

const paymentModel = mongoose.model("payment", paymentSchema);
export default paymentModel;
