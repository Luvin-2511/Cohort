import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required !"],
    },
    description: {
      type: String,
      required: [true, "Description is required !"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Seller id is required !"],
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    price: {
      type: priceSchema,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    attributes: {
      type: Map,
      of: String,
    },
    variant: [
      {
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        quantity: {
          type: Number,
          default: 0,
          min: 0,
        },
        price: {
          type: priceSchema,
        },
        attributes: {
          type: Map,
          of: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
