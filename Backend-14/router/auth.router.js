const express = require("express");
const authRouter = express.Router();
const userModel = require("../model/user.model");
authRouter.use(express.json());
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExist = await userModel.findOne({ email });

  if (userAlreadyExist) {
    return res.status(409).json({
      message: "User with email already exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,
    email,
    password:hash,
  });

  const token = jwt.sign(
    {
      user,
      email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("Token", token);

  res.status(201).json({
    message: "User created !",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User does not exists !",
    });
  }



  const passWordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!passWordMatched) {
    return res.status(404).json({
      message: "Email or password incorrect !",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("Token", token);

  res.status(200).json({
    message: "Login successfull !",
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  const cookie = req.cookies;
  res.status(200).json({
    message: "Cookie fetched",
    cookie,
  });
});

module.exports = authRouter;
