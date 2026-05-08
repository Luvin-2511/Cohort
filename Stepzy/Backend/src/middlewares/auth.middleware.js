import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

/**
 * @route Middleware
 * @description Auth Middleware to authenticate a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next({
      status: 400,
      message: "Unauthorized access !",
    });
  }
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
    req.user = decoded;
    next()
  } catch (err) {
    next(err);
  }
}
