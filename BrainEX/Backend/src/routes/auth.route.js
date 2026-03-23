import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController
} from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authUserMiddleware, logoutController);
authRouter.get('/get-me',authUserMiddleware,getMeController)

export default authRouter;
