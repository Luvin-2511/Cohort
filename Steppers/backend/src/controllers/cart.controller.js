import { stockOfProduct } from "../dao/product.dao.js";
import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

/**
 * @route POST api/cart/:productId
 * @description Adds Product to the Cart of user , and also creates cart of user if it doesn't exists
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function addProductToCartController(req, res, next) {
  try {
    const { productId } = req.params;
    const { variantId, quantity } = req.body;
    const { id } = req.user;

    if (!productId) {
      return next({
        status: 400,
        message: "Product Id is required !",
      });
    }
    if (!quantity || quantity < 1) {
      return next({
        status: 400,
        message: "Quantity must be greater than 0",
      });
    }

    let product;
    product = await productModel.findOne({
      _id: productId,
    });

    if (!product) {
      return next({
        status: 404,
        message: "No Product or variant found !",
      });
    }

    if (product.variant.length > 0 && variantId == null) {
      return next({
        status: 400,
        message: "Select a variant !",
      });
    }

    let cart =
      (await cartModel.findOne({
        user: id,
      })) ||
      (await cartModel.create({
        user: id,
      }));

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId.toString() &&
        item.variant?.toString() === variantId?.toString(),
    );

    const stock = await stockOfProduct(productId, variantId);
    if (item) {
      if (item.quantity + quantity > stock) {
        return next({
          status: 400,
          message: `We currently only have ${stock} items in our stock ! You can only order ${stock - item.quantity} more item !`,
        });
      }
      item.quantity += quantity;
    } else {
      if (quantity > stock) {
        return next({
          status: 400,
          message: `We currently only have ${stock} items in our stock ! You can only order ${stock - item.quantity} more item !`,
        });
      }

      cart.items.push({
        product: productId,
        variant: variantId || null,
        quantity: quantity,
      });
    }
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully 1",
      cart,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/cart/get
 * @description Gets Cart for a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getCartController(req, res, next) {
  try {
    const { id } = req.user;
    const cart = await cartModel
      .findOne({
        user: id,
      })
      .populate("items.product");
    if (!cart) {
      return next({
        status: 400,
        message: "No current items in cart",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart Fetched successfully !",
      cart,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route PATCH api/cart/:productId
 * @description Removes a product from the cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function deleteProductFromCartController(req, res, next) {
  try {
    const { productId } = req.params;
    const { variantId } = req.body;
    const { id } = req.user;

    if (!productId) {
      return next({
        status: 400,
        message: "Product Id is required !",
      });
    }

    const cart =
      (await cartModel.findOneAndUpdate(
        { user: id },
        {
          $pull: {
            items: {
              variant: variantId,
              product: productId,
            },
          },
        },
      ),
      {
        new: true,
      }) ||
      (await cartModel.findOneAndUpdate(
        {
          user: id,
        },
        {
          $pull: {
            items: {
              product: productId,
            },
          },
        },
      ),
      {
        new: true,
      }).populate("items.product");

    if (!cart) {
      return next({
        status: 400,
        message: "Product not found in cart !",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Item deleted from cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route PATCH api/cart/increase/:productId
 * @description Increase the quantity of Product in cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function increaseCountInCartController(req, res, next) {
  try {
    const { productId } = req.params;
    const { variantId } = req.body;
    const { id } = req.user;
    const stock = await stockOfProduct(productId, variantId);

    let cart = await cartModel
      .findOneAndUpdate(
        {
          user: id,
          items: {
            $elemMatch: {
              product: productId,
              variant: variantId ?? null,
              quantity: { $lt: stock },
            },
          },
        },
        {
          $inc: {
            "items.$.quantity": 1,
          },
        },
        {
          new: true,
        },
      )
      .populate("items.product");

    if (!cart) {
      return next({
        status: 400,
        message: "No item in cart !",
      });
    }

    // cart.items.map((item) => {
    //   if (item.product._id == productId && item.variant == variantId) {
    //     if (item.quantity < stock) item.quantity = item.quantity + 1;
    //   }else if(item.product._id == productId){
    //     if (item.quantity < stock) item.quantity = item.quantity + 1;
    //   }
    // });

    // await cart.save()

    return res.status(201).json({
      success: true,
      message: "Increased Quanity by 1 !",
      cart,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route PATCH api/cart/decrease/:productId
 * @description Decrease the quantity of Product in cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function decreaseCountInCartController(req, res, next) {
  try {
    const { productId } = req.params;
    const { variantId } = req.body;
    const { id } = req.user;

    let cart = await cartModel
      .findOneAndUpdate(
        {
          user: id,
          items: {
            $elemMatch: {
              product: productId,
              variant: variantId ?? null,
              quantity: { $gt: 1 },
            },
          },
        },
        {
          $inc: {
            "items.$.quantity": -1,
          },
        },
        {
          new: true,
        },
      )
      .populate("items.product");

    if (!cart) {
      return next({
        status: 400,
        message: "No item in cart !",
      });
    }

    // cart.items.map((item) => {
    //   if (item.product._id == productId && item.variant == variantId) {
    //     if (item.quantity < stock) item.quantity = item.quantity - 1;
    //   }else if(item.product._id == productId){
    //     if (item.quantity < stock) item.quantity = item.quantity - 1;
    //   }
    // });

    // await cart.save()

    return res.status(201).json({
      success: true,
      message: "Decrease Quanity by 1 !",
      cart,
    });
  } catch (error) {
    next(error);
  }
}
