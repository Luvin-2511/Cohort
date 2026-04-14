import express, { urlencoded } from 'express'
import authRouter from './routes/auth.route'
import { errorHandler } from './middlewares/error.middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(express.static(urlencoded({ extended: true })))
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

/**
 * Routes
 */
app.use('/api/auth',authRouter)

app.use(errorHandler)

export default app