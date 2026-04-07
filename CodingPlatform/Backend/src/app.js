import express from 'express'
import authRouter from './routes/auth.route'
import { errorHandler } from './middlewares/error.middleware'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.static())
app.use(cookieParser())

/**
 * Routes
 */
app.use('/api/auth',authRouter)

app.use(errorHandler)

export default app