import {Router} from 'express'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'
import { renameController } from '../controllers/user.controller.js'
import { renameValidator } from '../validators/user.validator.js'

const userRouter = Router()

userRouter.patch('/rename',authUserMiddleware,renameValidator,renameController)

export default userRouter