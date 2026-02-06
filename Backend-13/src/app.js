const express = require("express");
const authRouter = require('../router/auth.router')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
app.use('/api/auth',authRouter)

module.exports = app;
