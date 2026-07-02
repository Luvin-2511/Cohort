import mongoose from "mongoose";
import cartModel from "../model/cart.model.js";

export async function getCartDetails(userId) {
  const cart = (
    await cartModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      { $unwind: { path: "$items" } },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: { path: "$items.product" } },
      {
        $unwind: { path: "$items.product.variant" },
      },
      {
        $match: {
          $expr: {
            $eq: ["$items.variant", "$items.product.variant._id"],
          },
        },
      },
      {
        $addFields: {
          itemPrice: {
            price: {
              $multiply: [
                "$items.product.variant.price.amount",
                "$items.quantity",
              ],
            },
            currency: "$items.product.variant.price.currency",
          },
        },
      },
      {
        $group: {
          _id: "_id",
          totalPrice: { $sum: "$itemPrice.price" },
          currency: {
            $first: "$itemPrice.currency",
          },
          items: { $push: "$items" },
        },
      },
    ])
  )[0];

  return cart 
}
