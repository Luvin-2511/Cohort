const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require('../models/like.model')
/**
 * Image Kit private Key applied
 */
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Creates Posts
 */
async function createPostController(req, res) {
  const { caption } = req.body;

  /**
   * If user doesnt send a file then return
   */
  if (!req.file) {
    return res.status(400).json({ message: "File missing!" });
  }

  /**
   * Using image kit to upload file on imageKit and get the url
   */
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohort_Insta_Clone",
  });

  /**
   * Created Post
   */
  const post = await postModel.create({
    caption: caption,
    url: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: `Post created successfully by ${req.user.username}`,
    post,
  });
}

/**
 * Fetched Posts
 */
async function getPostController(req, res) {
  /**
   * Getting ID of user and using it to fetch all the posts created by user
   */
  const userId = req.user.id;
  const post = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post fetched successfully !",
    post,
  });
}

/**
 * Fetches Specific Post
 */
async function getPostDetailController(req, res) {
  /**
   * Requiring necessary params
   */
  const userId = req.user.id;
  const postId = req.params.postId;

  /**
   * Getting post and checking if it exists , if not return
   */
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found !",
    });
  }

  /**
   * Checking if the post user is requesting belongs to the user, if not return
   */
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden access",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully !",
    post,
  });
}

/**
 * Like a Post 
 */
async function likePostController(req, res) {
  const postId = req.params.postId
  const username = req.user.username

  /**
   * Checking whether the post user wants to like exist or not, if not return
   */
  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
      message:"Post not found !"
    })
  }

  const likeRecord = await likeModel.create({
    post:postId,
    user:username
  })

  return res.status(200).json({
    message:"Post liked successfully",
    post
  })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  likePostController,
};
