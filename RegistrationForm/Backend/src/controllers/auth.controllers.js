const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Fill all Details !",
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: `User Already exists with same ${isUserAlreadyExists.email === email ? "email" : "username"}`,
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password: hash,
  });

  const token = jwt.sign(
    {
      username: username,
      email: email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Registration Successful !",
    user,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (!user) {
    return res.status(409).json({
      message: "Invalid Credentials !",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(409).json({
      message: "Invalid Credentials !",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
  );

  res.cookie("token",token)

  res.status(200).json({
    message:"User logged in Successful !",
    user
  })
}

module.exports = {
  registerUser,
  loginUser,
};
