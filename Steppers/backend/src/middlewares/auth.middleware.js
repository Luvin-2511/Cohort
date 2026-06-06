import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

/**
 * @middleware
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next({
      status: 403,
      message: "unauthorized User",
    });
  }
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
    req.user = decoded
    next()
  } catch (err) {
    console.log(err);
  }
}
