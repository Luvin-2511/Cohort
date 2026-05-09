const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
/**
 * Middlewares
 */
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

/**
 * Routes
 */
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/user.route')
const { errorHandler } = require('./middlewares/error.middleware')

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
app.use('/api/user',userRouter)

app.use(errorHandler)

module.exports = app