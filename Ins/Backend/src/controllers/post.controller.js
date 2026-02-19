const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGE_KIT,
});

async function createPost(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token doesn't exists !",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort2_instaClone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post uploaded successfully !",
    post,
  });
}

async function getPost(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token Invalid",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      message: "Token Invalid",
    });
  }

  const userID = decoded.id;

  const posts = await postModel.find({
    user: userID,
  });

  res.status(200).json({
    message: "Posts fetched successfully !",
    posts,
  });
}

async function getPostDetails(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token Invalid !",
    });
  }
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Token Invalid !",
    });
  }

  const postId = req.params.postId
  const userId = decoded.id

  const post = await postModel.findById({postId})
  if(!post){
    return res.status(404).json({
        message:"Post not found !"
    })
  }

  const isValidUser = post.user.toString() == userId
  if(!isValidUser){
    return res.status(403).json({
        message:"Forbidden Access !"
    })
  }

  res.status(200).json({
    message:"Post fetched !",
    post
  })
}

module.exports = { createPost, getPost, getPostDetails };
