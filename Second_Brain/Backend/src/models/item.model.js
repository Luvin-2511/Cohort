import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["article", "tweet", "image", "video", "pdf", "youtube"],
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    viewCount:{
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    embedding: [Number],
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const itemModel = mongoose.model("item", itemSchema);

export default itemModel;
