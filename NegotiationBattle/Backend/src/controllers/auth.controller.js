import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * @route POST api/auth/register
 * @description Registers an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return next({
        status: 400,
        message: "Fill all fields correctly !",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return next({
        status: 400,
        message: "User already exists !",
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
        username: username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully !",
      safeUser,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in a User
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
        message: "Enter all fields correctly !",
      });
    }

    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");

    if (!user) {
      return next({
        status: 400,
        message: "User doesn't exist !",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Incorrect email or password !",
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json({
      success: true,
      message: "Logged in successfully !",
      safeUser,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/auth/get-me
 * @description Fetches information of a user if he is logged in
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function getMeController(req, res, next) {
  try {
    const { username } = req.user;
    if (!username) {
      return next({
        status: 403,
        message: "Unauthorized User !",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return next({
        status: 404,
        message: "User doesn't exist !",
      });
    }

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).json({
      status: 200,
      message: "Fetched User Successfully !",
      safeUser,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out a User
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function logoutController(req, res, next) {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logout successfully !",
  });
}

/**
 * @route POST api/auth/character-select
 * @description description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function characterSelectController(req, res, next) {
  const { character } = req.body;
  if (!character) {
    return next({
      status: 400,
      message: "Character Not Chosen",
    });
  }
  const { id } = req.user;
  const user = await userModel.findById(id);
  if (!user) {
    return next({
      status: 404,
      message: "User not found !",
    });
  }

  if (user.character !== null) {
    return next({
      status: 400,
      message: "Cannot select character again",
    });
  }

  user.character = character;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Character selected successfully",
    user,
  });
}
