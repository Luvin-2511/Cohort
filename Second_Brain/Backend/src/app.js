import express from 'express'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/error.middleware'
const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(cookieParser())
app.use(cors())

/**
 * Routes
 */
app.use('/api/auth',authRouter)

app.use(errorHandler)

export default app