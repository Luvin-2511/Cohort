import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Mongo URI is not found in dotenv");
}

if (!process.env.PORT) {
  throw new Error("Port is not found in dotenv");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret is not found in dotenv");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Google client id is not found in dotenv");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client secret is not found in dotenv");
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("IMAGEKIT_PRIVATE_KEY is not found in dotenv");
}

export const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number(process.env.PORT),
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
  IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
};
