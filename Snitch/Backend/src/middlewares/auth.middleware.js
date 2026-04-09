import jwt from 'jsonwebtoken'
/**
 * @route Middleware
 * @description Checks whether a user is verified or not
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 *
 */
export async function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next({
      status: 403,
      message: "Unauthorized User !",
    });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(err);
  }
}
