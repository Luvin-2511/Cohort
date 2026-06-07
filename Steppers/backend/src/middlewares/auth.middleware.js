import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";
import userModel from '../model/auth.model.js'

/**
 * @middleware Auth
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
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
  }
}

/**
 * @middleware Auth Seller
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function sellerAuthMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next({
      status: 403,
      message: "unauthorized User",
    });
  }
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (user.role != "seller") {
      return next({
        status: 403,
        message: "Only seller account has access to uploading product",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}
