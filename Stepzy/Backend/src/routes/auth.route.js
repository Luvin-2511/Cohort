import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";
import {
  registrationValidator,
  loginValidator,
} from "../validators/auth.validator";

const authRouter = Router();

authRouter.post("/register", registrationValidator(), registerController);
authRouter.post("/login", loginValidator(), loginController);

export default authRouter;
