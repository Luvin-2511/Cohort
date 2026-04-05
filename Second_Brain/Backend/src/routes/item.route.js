import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  saveItemValidator,
  searchItemValidator,
  relatedItemValidator,
} from "../validators/item.validator.js";
import {
  saveItemController,
  getItemController,
  searchItemController,
  relatedItemController,
  resurfaceController
} from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.post("/save-item", authMiddleware, saveItemValidator, validateRequest, saveItemController);
itemRouter.get("/get-item", authMiddleware, getItemController);
itemRouter.get("/search", authMiddleware, searchItemValidator, validateRequest, searchItemController);
itemRouter.get("/resurface", authMiddleware, resurfaceController);
itemRouter.get("/:itemId/related", authMiddleware, relatedItemValidator, validateRequest, relatedItemController);

export default itemRouter;
