import { Router } from "express";
import {
  registerController,
  loginController,
  googleCallback,
} from "../controllers/auth.controller.js";
import {
  registrationValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import passport from "passport";
import { CONFIG } from "../config/config.js";

const authRouter = Router();

authRouter.post("/register", registrationValidator(), registerController);
authRouter.post("/login", loginValidator(), loginController);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect:
        CONFIG.NODE_ENV === "development"
          ? "http://localhost:5173/login"
          : "/login",
    },
    googleCallback,
  ),
);

export default authRouter;
