import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/error.middleware.js'
import itemRouter from './routes/item.route.js'
import collectionRouter from './routes/collection.route.js'
const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials:true
}))

/**
 * Routes
 */
app.use('/api/auth',authRouter)
app.use('/api/item',itemRouter)
app.use('/api/collection',collectionRouter)

app.use(errorHandler)

export default app