import jwt from "jsonwebtoken";
export async function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next({
      status: 403,
      message: "Token is required !",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next({
      status: 403,
      message: err.message,
    });
  }
}
