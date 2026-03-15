const { Router } = require("express");
const userRouter = Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

userRouter.post('/add-favorite',authMiddleware.AuthenticateUser,userController.addFavoriteController)

module.exports = userRouter