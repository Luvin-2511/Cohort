const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer(multer.memoryStorage({}))

postRouter.post('/',upload.single('post'),postController.createPostController)
postRouter.get('/',postController.getPostController)
postRouter.get('/:postId',postController.getPostDetailController)

module.exports = postRouter