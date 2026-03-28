import express from 'express'
import authRouter from './routes/user.route.js'
import { ErrorHandlerMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)


app.use(ErrorHandlerMiddleware)
export default app