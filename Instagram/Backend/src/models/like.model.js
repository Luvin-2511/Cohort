const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Login is Required to like a post!"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post is Required !"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const likeModel = mongoose.model('like',likeSchema)

module.exports = likeModel

