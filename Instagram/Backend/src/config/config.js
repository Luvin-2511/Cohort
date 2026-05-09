const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not present in the ENV");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not present in the ENV");
}
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("IMAGEKIT_PRIVATE_KEY not present in the ENV");
}

const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};

module.exports = { CONFIG };
