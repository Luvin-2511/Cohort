import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route POST api/auth/register
 * @description Registers an user to the website
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next({
        status: 400,
        message: "All Fields Required !",
      });
    }
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAlreadyExists) {
      return next({
        status: 400,
        message: `User with this email or username already exists!`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User Registered successfully !",
      user
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function loginController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const identifier = username || email;

    if (!identifier || !password) {
      return next({
        status: 400,
        message: "All fields are required !",
      });
    }
    const user = await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return next({
        status: 404,
        message: "User doesn't exists !",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next({
        status: 403,
        message: "Invalid email or password !",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);
    return res.status(201).json({
      success: true,
      message: "User logged in successfully !",
      user
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logoutController(req, res, next) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logout successfully !",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/auth/get-me
 * @description Gets information about the user who is logged in
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getMeController(req, res, next) {
  const { id } = req.user;
  if (!id) {
    return next({
      status: 403,
      message: "Unauthorized User",
    });
  }

  const user = await userModel.findById(id).select("-password");
  if (!user) {
    return next({
      status: 400,
      message: "User doesn't exist !",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User detail fetched successfully !",
    user,
  });
}
