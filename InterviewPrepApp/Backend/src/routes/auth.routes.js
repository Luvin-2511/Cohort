const express = require('express')
const authRouter = express.Router()
const authControllers = require('../controllers/auth.controller')
const authUser = require('../middlewares/auth.middleware')

authRouter.post('/register', authControllers.registerController)
authRouter.post('/login',authControllers.loginController)
authRouter.post('/logout',authUser,authControllers.logoutController)
authRouter.get('/get-me',authUser,authControllers.getMecontroller)

module.exports = authRouter
