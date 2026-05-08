import { jsonTokenSaver } from "../helpers/jsonToken.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

/**
 * @route POST api/auth/register
 * @description Registers a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController(req, res, next) {
  try {
    const { fullName, email, contactNo, password, role } = req.body;
    if (!fullName || !email || !password) {
      return next({
        status: 400,
        message: "Fill every required detail",
      });
    }

    const userAlreadyExist = await userModel.findOne({ email });
    if (userAlreadyExist) {
      return next({
        status: 403,
        message: "User with email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullName,
      email,
      contactNo,
      password: hashedPassword,
      role,
    });

    jsonTokenSaver(user, res, "Registered in Successfully !");
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in a user
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
        message: "Fill all required fields !",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next({
        status: 400,
        message: "Invalid Email or password !",
      });
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Invalid Email or password !",
      });
    }

    jsonTokenSaver(user, res, "Logged in successfully !");
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logoutController(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully !",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/me
 * @description Gets the current logged in user Info
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getMeController(req, res, next) {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return next({
        status: 400,
        message: "Invalid Token !",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully !",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
