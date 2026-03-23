import blackListModel from '../model/blacklist.model.js';
import userModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'

/**
 * @middleware
 * @description A middleware that checks whether the user is authorized or not
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 */
export async function authUserMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token, please re-login !",
    });
  }

  const isTokenBlacklisted = await blackListModel.findOne({
    token:token
  })

  if(isTokenBlacklisted){
    return res.status(403).json({
        success:false,
        message:"Invalid Token !"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist !",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
