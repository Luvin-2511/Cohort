const express = require('express')
const converterRouter = require('./routes/converter.route')
const cors = require('cors')

const app = express()
app.use(express.json())

const allowedOrigins = [
  'https://yump3-git-main-luvin-2511s-projects.vercel.app',
  'https://yump3-mmqk5j8wi-luvin-2511s-projects.vercel.app', 
  'http://localhost:5173', 
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

app.use('/api', converterRouter)

module.exports = app