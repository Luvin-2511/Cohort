import { Router } from "express";
import { authMiddleware, sellerAuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getAllProductsController,
  getProductController,
} from "../controllers/product.controller.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

productRouter.post(
  "/create",
  upload.array("images", 7),
  sellerAuthMiddleware,
  createProductController,
);
productRouter.get("/", sellerAuthMiddleware, getProductController);
productRouter.get("/products",authMiddleware,getAllProductsController)

export default productRouter;
