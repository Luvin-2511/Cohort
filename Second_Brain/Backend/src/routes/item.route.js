import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  saveItemValidator,
  searchItemValidator,
  relatedItemValidator,
} from "../validators/item.validator.js";
import {
  saveItemController,
  saveFileController,
  getItemController,
  searchItemController,
  relatedItemController,
  resurfaceController,
  deleteItemController,
  getSingleItemController,
} from "../controllers/item.controller.js";

const itemRouter = Router();

// Multer — memory storage, max 50 MB, accepts image/video/pdf only
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/", "video/", "application/pdf"];
    const ok = allowed.some((prefix) => file.mimetype.startsWith(prefix));
    cb(ok ? null : new Error("Unsupported file type"), ok);
  },
});

itemRouter.post("/save-item", authMiddleware, saveItemValidator, validateRequest, saveItemController);
itemRouter.post("/save-file", authMiddleware, upload.single("file"), saveFileController);
itemRouter.get("/get-item", authMiddleware, getItemController);
itemRouter.get("/search", authMiddleware, searchItemValidator, validateRequest, searchItemController);
itemRouter.get("/resurface", authMiddleware, resurfaceController);
itemRouter.get("/:itemId", authMiddleware, getSingleItemController);
itemRouter.get("/:itemId/related", authMiddleware, relatedItemValidator, validateRequest, relatedItemController);
itemRouter.delete("/:itemId", authMiddleware, deleteItemController);

export default itemRouter;
