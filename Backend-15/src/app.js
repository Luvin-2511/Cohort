import express from 'express'
import authRouter from './route/auth.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const app = express()
app.use('/api/auth',authRouter)
app.use(errorMiddleware)

export default app