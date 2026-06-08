import mongoose from "mongoose";
import { CONFIG } from "./config.js";

async function connectToDB() {
  try {
    await mongoose.connect(CONFIG.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error while connecting to DB", err);
  }
}

export default connectToDB;
