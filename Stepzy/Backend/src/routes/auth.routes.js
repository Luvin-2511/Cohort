import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController
} from "../controllers/auth.controller";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";


const authRouter = Router();


authRouter.post("/register", registerValidator(), registerController);
authRouter.post("/login", loginValidator(), loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
