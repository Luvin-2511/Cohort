import {Router} from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {getResponseController} from '../controllers/game.controller.js'

const gameRouter = Router()

gameRouter.post('/ai-response',authMiddleware,getResponseController)

export default gameRouter