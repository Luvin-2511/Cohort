import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Mongo Uri is not present !");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Jwt secret is not present !");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("google client id is not present !");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("google client secret is not present !");
}


export const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
