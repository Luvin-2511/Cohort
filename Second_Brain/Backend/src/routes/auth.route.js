import {Router} from 'express'
import { getMeController, loginController, logoutController, registerController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/logout",authMiddleware,logoutController)
authRouter.post("/get-me",authMiddleware,getMeController)

export default authRouter