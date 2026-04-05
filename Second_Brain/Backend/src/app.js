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
    origin: [
        'http://localhost:5173',
        'https://memex-orpin.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}))

/**
 * Routes
 */
app.use('/api/auth',authRouter)
app.use('/api/item',itemRouter)
app.use('/api/collection',collectionRouter)

app.use(errorHandler)

export default app