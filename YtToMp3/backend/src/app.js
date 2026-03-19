const express = require('express')
const converterRouter = require('./routes/converter.route')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({
    origin:'https://yump3-git-main-luvin-2511s-projects.vercel.app',
    credentials:true,
}))
app.use('/api',converterRouter)

module.exports = app