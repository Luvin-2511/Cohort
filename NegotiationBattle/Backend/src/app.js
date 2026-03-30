import express from 'express'
import authRouter from './routes/user.route.js'
import { ErrorHandlerMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import gameRouter from './routes/game.route.js'

const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))
app.use("/api/auth",authRouter)
app.use('/api/game',gameRouter)

app.use(ErrorHandlerMiddleware)
export default app