import userModel from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { CONFIG } from "../config/config.js";
import jwt from 'jsonwebtoken'

/**
 * @route POST api/auth/register
 * @description Register an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function registerController(req, res, next) {
  try {
    const { name, email, password, contact, role } = req.body;
    if (!name || !email || !password) {
      return next({
        status: 400,
        message: "Fill all the fields correctly",
      });
    }

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return next({
        status: 409,
        message: "User already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      contact,
      password: hashPass,
      role,
    });

    generateToken(res, user);

    res.status(201).json({
      message: "User registered successfully !",
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 400,
        message: "Fill all the fields correctly",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "User doesnt exists",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user);

    res.status(201).json({
      message: "User loggedIn successfully !",
      success: true,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    next(error);
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function logoutController(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(201).json({
      success: true,
      message: "User logged put successfully !",
    });
  } catch (error) {
    next(error);
  }
}
/**
 * @route POST api/auth/me
 * @description Gets current logged in user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function getMeController(req, res, next) {
  try {
    const { email } = req.user;
    if (!email) {
      next({
        status: 403,
        message: "Unauthorized User !",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next({
        status: 404,
        message: "User not found !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        contact: user.contact,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function googleCallback(req, res, next) {
  const { id, displayName, emails } = req.user;
  const email = emails[0].value;

  let user = await userModel.findOne({ email: email });

  if (!user) {
    user = await userModel.create({
      name: displayName,
      email: email,
      googleId: id,
    });
  }

  const token = jwt.sign(
    {
      id:user._id,
      email: user.email,
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.redirect("http://localhost:5173/home");
}
