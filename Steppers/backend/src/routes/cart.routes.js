import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addProductToCartController,
  deleteProductFromCartController,
  decreaseCountInCartController,
  getCartController,
  increaseCountInCartController,
  createOrderController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId", authMiddleware, addProductToCartController);
cartRouter.post("/payment/create/order", authMiddleware, createOrderController);
cartRouter.get("/get", authMiddleware, getCartController);
cartRouter.patch(
  "/:productId",
  authMiddleware,
  deleteProductFromCartController,
);
cartRouter.patch(
  "/increase/:productId",
  authMiddleware,
  increaseCountInCartController,
);
cartRouter.patch(
  "/decrease/:productId",
  authMiddleware,
  decreaseCountInCartController,
);

export default cartRouter;
