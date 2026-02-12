const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, email, password } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: `User exists with the same ${isUserExist.email == email ? "email" : "username"}`,
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    email,
    username,
    password: hash,
  });

  const token = jwt.sign(
    {
      email,
      username,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User created successfully !",
    user,
  });
}

async function login(req, res) {
  const { email, username, password } = req.body;

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
    return res.status(404).json({
      message: "User doesnt exist !",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");
  const isPasswordValid = user.password === hash;

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Incorrect Password !",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message:"Login successfull !",
    user
  })
}

module.exports = { register, login };
