import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  price: {
    type: priceSchema,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
