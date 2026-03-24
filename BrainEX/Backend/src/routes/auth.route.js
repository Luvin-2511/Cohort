import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController,
  emailVerify,
} from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { registrationValidation } from "../validators/auth.validator.js";
const authRouter = Router();

authRouter.post("/register", registrationValidation, registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authUserMiddleware, logoutController);
authRouter.get("/get-me", authUserMiddleware, getMeController);
authRouter.get("/activate", emailVerify);

export default authRouter;
