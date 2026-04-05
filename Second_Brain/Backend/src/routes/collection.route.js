import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCollectionController,
  getCollectionController,
} from "../controllers/collection.controller.js";

const collectionRouter = Router();

collectionRouter.post("/create", authMiddleware, createCollectionController);
collectionRouter.get("/get", authMiddleware, getCollectionController);

export default collectionRouter;
