/**
 * @route Middleware
 * @description Handles Error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export function errorHandler(req, res, err, next) {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
}
