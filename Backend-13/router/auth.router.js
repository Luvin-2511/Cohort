const express = require("express");
const authRouter = express.Router();
const userModel = require("../model/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
authRouter.use(express.json());

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const users = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      name,
      email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie('jwt_token',token)

  res.status(201).json({
    message: "User created successfully !",
    users,
    token
  });
});

module.exports = authRouter;
