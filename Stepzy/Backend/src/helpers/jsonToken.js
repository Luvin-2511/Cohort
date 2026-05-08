import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

export function jsonTokenSaver(user, res, message) {
  const token = jwt.sign(
    {
      id:user._id
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token",token)

  res.status(201).json({
    success:true,
    message,
    user : {
      id:user._id,
      fullName:user.fullName,
      email:user.email,
      contactNo:user.contactNo,
      role:user.role,
    }
  })
}
