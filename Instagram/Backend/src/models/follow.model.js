const mongoose = require("mongoose");

let followSchema = new mongoose.Schema(
    {
        follower: {
            type: String,
            required: [true, "You have to login first !"],
        },
        followee: {
            type: String,
            required: [true, "You have to login first !"],
        },
        status: {
            type: String,
            default: "pending",
            enum:["pending","accepted","rejected"],
        }
    },
    {
        timestamps: true,
    },
);

followSchema.index({follower: 1, followee: 1}, {unique: true});

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
