import {Router} from 'express'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'
import { responseGenerateController } from '../controllers/chat.controller.js'
const chatRouter = Router()

chatRouter.post('/',authUserMiddleware,responseGenerateController)

export default chatRouter