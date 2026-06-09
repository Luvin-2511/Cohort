import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController,
  googleCallback,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);
authRouter.post("/login", loginValidator, loginController);
authRouter.post("/logout", authMiddleware, logoutController);
authRouter.get("/me", authMiddleware, getMeController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default authRouter;
