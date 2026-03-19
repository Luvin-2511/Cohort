const express = require('express')
const converterRouter = require('./routes/converter.route')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use('/api',converterRouter)

module.exports = app