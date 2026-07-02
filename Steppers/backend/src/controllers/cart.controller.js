import mongoose from "mongoose";
import { stockOfProduct } from "../dao/product.dao.js";
import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";
import { createOrder } from "../services/payment.service.js";
import { getCartDetails } from "../dao/cart.dao.js";
import paymentModel from "../model/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { CONFIG } from "../config/config.js";

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
    const { variantId, quantity, price } = req.body;
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
        price: price,
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
    let cart = await getCartDetails(id);

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
              quantity: { $gt: 0 },
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

    await cartModel.updateOne(
      {
        user: id,
      },
      {
        $pull: {
          items: {
            quantity: 0,
          },
        },
      },
    );
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

/**
 * @route POST api/cart/payment/create/order
 * @description Creates order for a user with payment
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createOrderController(req, res, next) {
  let cart = await getCartDetails(req.user.id);

  const order = await createOrder({
    amount: cart.totalPrice,
    currency: cart.currency,
  });

  const payment = await paymentModel.create({
    user: req.user.id,
    razorpay: {
      orderId: order.id,
    },
    price: {
      amount: cart.totalPrice,
      currency: cart.currency,
    },
    orderItems: cart.items.map((item) => ({
      productId: item.product._id,
      variantId: item.variant,
      title: item.product.title,
      description: item.product.description,
      size: item.product.size,
      quantity: item.quantity,
      images: item.product.variant.images,
      price: {
        amount: item.variant.price.amount,
        currency: item.variant.price.currency,
      },
    })),
  });

  if (!payment) {
    next({
      status: 400,
      message: "Failed to create payment",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Order Created",
    order,
  });
}

/**
 * @route POST api/cart/payment/verify/order
 * @description Verifies whether user payment is done or not
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function verifyOrderController(req, res, next) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const payment = await paymentModel.find({
    "razorpay.orderId": razorpay_order_id,
    status: "pending",
  });

  if (!payment) {
    return next({
      status: 404,
      message: "Payment not found !",
    });
  }
  const isPaymentValid = await validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    CONFIG.RAZORPAY_SECRET,
  );

  if (!isPaymentValid) {
    payment.status = "failed";
    await payment.save();

    return next({
      status: 400,
      message: "Payment Verification failed !",
    });
  }

  payment.status = "success";
  payment.razorpay.paymentId = razorpay_payment_id;
  payment.razorpay.signature = razorpay_signature;
  await payment.save();

  return res.status(201).json({
    success: true,
    message: "Payment successful !",
  });
}

/**
 * @route POST api/cart/order-success?order-id=
 * @description Shows the order detail so that user can see it
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function orderSuccessDetailController(req, res, next) {
  const { "order-id": orderId } = req.query;
  if (!orderId) {
    next({
      status: 400,
      message: "Order Id not found !",
    });
  }

  const payment = await paymentModel.findOne({
    "razorpay.orderId": orderId,
    status: "success",
  });

  if (!payment) {
    next({
      status: 404,
      message: "Payment not found !",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Order detail fetched !",
    details: {
      orderItmes: payment.orderItems,
      price: payment.price,
    },
  });
}

/**
 * @route POST api/cart/orders
 * @description Fetches all the user order
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getAllOrderOfUserController(req, res, next) {
  const { id } = req.user;
  const payment = await paymentModel.find({ user: id });
  if(!payment) {
    next({
      status: 400,
      message:"No Order done !"
    })
  }

  return res.status(200).json({
    success:true,
    message: "All order fetched",
    payment
  })
}
