import { Router } from "express";
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  loginValidation,
  registrationValidation,
} from "../validators/auth.validator";

const authRouter = Router();

authRouter.post("/register", registrationValidation, registerController);
authRouter.post("/login", loginValidation, loginController);
authRouter.post("/get-me", authMiddleware, getMeController);
authRouter.post("/logout", authMiddleware, logoutController);

export default authRouter;
