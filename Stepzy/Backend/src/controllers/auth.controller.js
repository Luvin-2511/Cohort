import userModel from "../models/auth.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CONFIG from '../config/config.js'

async function setTokenSendResponse(user, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    sameSite: true,
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production",
    maxAge: 24 * 1024 * 1024,
  });

  return res.status(200).json({
    success: true,
    message: message,
    user: {
      fullname: user.fullname,
      email: user.email,
      contactNumber: user.contactNumber,
      role: user.role,
    },
  });
}

/**
 * @route POST api/auth/register
 * @description Registers an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController(req, res, next) {
  try {
    const { fullname, email, contactNumber, password, role } = req.body;
    if (!fullname || !email || !password || !contactNumber || !role) {
      return next({
        status: 400,
        message: "Fill all fields correctly",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { fullname }],
    });
    if (isUserAlreadyExists) {
      return next({
        status: 409,
        message: "User already exists with same email or fullname",
      });
    }

    const hashedPassword = await bcrypt.hash(password);
    const user = await userModel.create({
      fullname,
      contactNumber,
      email,
      role,
      password: hashedPassword,
    });

    setTokenSendResponse(user, "User regitered Successfully !");
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

    setTokenSendResponse(user, "User logged in successfully !");
  } catch (err) {
    next(err);
  }
}

/**
 * GOOGLE LOGIN AND SIGNUP CONFIG
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function googleCallback(req, res, next) {
  try {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value,
    const photo = photos[0].value
    
    let user = await userModel.findOne({ email });
    if(!user) {
      user = userModel.create({
        fullname: displayName,
        googleId: id,
        email: email,
        profilePic: photo,
      })
    }

    const token = jwt.sign({
      id:user._id,
    },CONFIG.JWT_SECRET,{
      expiresIn:'7d'
    })

    res.cookie("token",token)
    res.redirect('http://localhost:5173/')

  } catch {
    next(err);
  }
}
