import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addProductToCartController,
  deleteProductFromCartController,
  decreaseCountInCartController,
  getCartController,
  increaseCountInCartController,
  createOrderController,
  verifyOrderController,
  orderSuccessDetailController,
  getAllOrderOfUserController
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId", authMiddleware, addProductToCartController);
cartRouter.post("/payment/create/order", authMiddleware, createOrderController);
cartRouter.post("/payment/verify/order", authMiddleware, verifyOrderController);
cartRouter.get("/order-success", authMiddleware, orderSuccessDetailController);
cartRouter.get("/orders", authMiddleware, getAllOrderOfUserController);
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
