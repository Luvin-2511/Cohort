import { Router } from "express";
import {
  loginController,
  registerController,
  getMeController,
  logoutController,
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator(), registerController);
authRouter.post("/login", loginValidator(), loginController);
authRouter.get("/get-me", authMiddleware, getMeController);
authRouter.post("/logout", authMiddleware, logoutController);

export default authRouter;
