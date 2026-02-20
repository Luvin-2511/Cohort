const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer(multer.memoryStorage({}));
const identifyUser = require("../middlewares/auth.middleware");

postRouter.post(
  "/",
  upload.single("post"),
  identifyUser,
  postController.createPostController,
);

postRouter.get("/", identifyUser, postController.getPostController);
postRouter.get(
  "/:postId",
  identifyUser,
  postController.getPostDetailController,
);

module.exports = postRouter;
