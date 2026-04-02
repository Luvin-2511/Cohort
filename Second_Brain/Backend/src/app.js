import express from 'express'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
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


export default app