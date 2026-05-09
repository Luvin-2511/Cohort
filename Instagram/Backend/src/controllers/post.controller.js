const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");
const { CONFIG } = require("../config/config");

/**
 * Image Kit private Key applied
 */
const imagekit = new ImageKit({
  privateKey: CONFIG.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Creates Posts
 */
async function createPostController(req, res, next) {
  try {
    const { caption } = req.body;

    /**
     * If user doesn't send a file then return
     */
    if (!req.file) {
      return next({
        status: 400,
        message: "File missing!",
      });
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
  } catch (err) {
    next(err);
  }
}

/**
 * Fetched Posts
 */
async function getPostController(req, res, next) {
  /**
   * Getting ID of user and using it to fetch all the posts created by user
   */
  try {
    const userId = req.user.id;
    const post = await postModel.find({
      user: userId,
    });

    res.status(200).json({
      message: "Post fetched successfully !",
      post,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Fetches Specific Post
 */
async function getPostDetailController(req, res, next) {
  try {
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
      return next({
        status: 404,
        message: "Post not found !",
      });
    }

    /**
     * Checking if the post user is requesting belongs to the user, if not return
     */
    const isValidUser = post.user.toString() === userId;
    if (!isValidUser) {
      return next({
        status: 403,
        message: "Forbidden access",
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully !",
      post,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Like a Post
 */
async function likePostController(req, res, next) {
  try {
    const postId = req.params.postId;
    const username = req.user.username;

    /**
     * Checking whether the post user wants to like exist or not, if not return
     */
    const post = await postModel.findById(postId);
    if (!post) {
      return next({
        status: 404,
        message: "Post not found !",
      });
    }

    const likeRecord = await likeModel.create({
      post: postId,
      user: username,
    });

    return res.status(200).json({
      message: "Post liked successfully",
      post,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Unlike a Post
 */
async function unlikePostController(req, res, next) {
  try {
    const { postId } = req.params;
    const { username } = req.user;

    const isLikedPost = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (!isLikedPost) {
      return next({
        status: 400,
        message: "Post isn't liked",
      });
    }

    await likeModel.findOneAndDelete({ _id: isLikedPost._id });

    return res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get feed meaning all the posts
 */
async function getFeedController(req, res, next) {
  try {
    const { username } = req.user;
    const posts = await postModel.find().populate("user").lean();
    const isLikedPost = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await likeModel.findOne({
          post: post._id,
          user: username,
        });
        post.isLiked = !!isLiked;
        return post;
      }),
    );
    return res.status(200).json({
      message: "Posts fetched successfully !",
      isLikedPost,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Delete Post (only Owner can)
 */
async function deletePostController(req, res, next) {
  try {
    const { postId } = req.params;
    const { id } = req.user;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found !",
      });
    }

    const isOwnerOfPost = post.user.toString() === id;
    if (!isOwnerOfPost) {
      return res.status(403).json({
        message: "You cannot delete Other's Post! ",
      });
    }

    await postModel.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully !",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  likePostController,
  getFeedController,
  unlikePostController,
  deletePostController,
};
