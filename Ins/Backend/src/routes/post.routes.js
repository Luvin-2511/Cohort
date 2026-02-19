const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/",upload.single('post'), postController.createPost);
postRouter.get("/", postController.getPost);
postRouter.get("/details/:postId", postController.getPostDetails);

module.exports = postRouter;
