import { Router } from "express";
import {
  authMiddleware,
  sellerAuthMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getAllProductsController,
  getProductController,
  fetchProductDetailController,
  updateProductController,
  addVariantController,
  deleteProductController,
  addToWishlistController,
  fetchWishlistController,
  RemoveWishlistController,
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
productRouter.get("/products", authMiddleware, getAllProductsController);
productRouter.get("/wishlist", authMiddleware, fetchWishlistController);
productRouter.post("/wishlist/:productId", authMiddleware, addToWishlistController);
productRouter.delete("/wishlist/:productId", authMiddleware,RemoveWishlistController);
productRouter.get("/:productId", authMiddleware, fetchProductDetailController);
productRouter.put("/:productId", sellerAuthMiddleware, updateProductController);
productRouter.delete("/:productId", sellerAuthMiddleware, deleteProductController);
productRouter.post(
  "/:productId/variant",
  upload.array("images", 5),
  sellerAuthMiddleware,
  addVariantController,
);

export default productRouter;
