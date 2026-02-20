const mongoose = require("mongoose");

let followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "You have to login first !"],
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "You have to login first !"],
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model('follow',followSchema)

module.exports = followModel
