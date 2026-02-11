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

module.exports = { register };
