import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

export function generateToken(res, user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
