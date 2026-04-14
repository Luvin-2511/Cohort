import userModel from "../models/auth.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route POST api/auth/register
 * @description Registers an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController(req, res, next) {
  try {
    const { username, email, contactNumber, password } = req.body;
    if (!username || !email || !password || !contactNumber) {
      return next({
        status: 400,
        message: "Fill all fields correctly",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAlreadyExists) {
      return next({
        status: 409,
        message: "User already exists with same email or username",
      });
    }

    const hashedPassword = await bcrypt.hash(password);
    const user = await userModel.create({
      username,
      contactNumber,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token,{
        httpOnly: true,
        sameSite:"strict",
        secure:process.env.NODE_DEV==="production",
        maxAge:24*1024*1024
    });

  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 400,
        message: "Fill all fields correctly",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next({
        status: 400,
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 1024 * 1024,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      message: "User logged in successfully !",
    });
  } catch (err) {
    next(err);
  }
}
