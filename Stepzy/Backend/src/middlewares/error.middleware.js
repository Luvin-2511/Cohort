export function errorHandler(req, res, next, err) {
  return res.status(err.status || 500).json({
    success:false,
    message: err.message || "Server Error",
  });
}
