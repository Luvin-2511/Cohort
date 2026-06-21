import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
  ],
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
