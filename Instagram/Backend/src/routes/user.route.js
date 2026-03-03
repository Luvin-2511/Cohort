const express = require('express')
const userRouter = express.Router()
const multer = require('multer')
const upload = multer(multer.memoryStorage({}))
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')
const {memoryStorage} = require("multer");

userRouter.post('/follow/:username',identifyUser,userController.followUserController)
userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUserController)
userRouter.patch('/follow/:username',identifyUser,userController.followStatusController)
userRouter.patch('/update-me',upload.single('profile'),identifyUser,userController.updateUserInfo)

module.exports = userRouter