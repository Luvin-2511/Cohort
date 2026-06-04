import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator(), registerController);
authRouter.post("/login", loginValidator(), loginController);
authRouter.post("/logout", authMiddleware,logoutController);
authRouter.post("/me", authMiddleware,getMeController);

export default authRouter;
