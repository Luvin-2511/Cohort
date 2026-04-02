import {Router} from 'express'
import { registerController } from '../controllers/auth.controller'

const authRouter = Router()

authRouter.get("/", registerController)

export default authRouter