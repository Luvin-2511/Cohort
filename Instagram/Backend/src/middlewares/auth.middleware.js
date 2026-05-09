const jwt = require("jsonwebtoken");
const { CONFIG } = require("../config/config");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access !",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized Access !",
    });
  }
  req.user = decoded
  next()
}

module.exports = identifyUser;
