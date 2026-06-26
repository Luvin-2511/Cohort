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
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    price: {
      type: priceSchema,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    ratingSum: {
      type: Number,
      default:0
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      min: 3,
      max: 15,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
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
        stock: {
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
