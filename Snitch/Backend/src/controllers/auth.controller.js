import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next({
        status: 400,
        message: "Fill all fields properly",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return next({
        status: 400,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/login
 * @description Login a user
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
        message: "Fill all fields properly",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next({
        status: 404,
        message: "User not found",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/logout
 * @description Logout a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
*/
export async function logoutController(req, res, next) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/get-me
 * @description Fetches the logged in users detail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getMeController(req, res,next) {
  try {
    const {id} = req.user
    const user = await userModel.findById(id).select("-password")
    if(!user){
        return next({
            status:400,
            message:"User doesn't exist !"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Fetched user successfully !",
        user
    })
  }catch(err){
    next(err)
  }
}