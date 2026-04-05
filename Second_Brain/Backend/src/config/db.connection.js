import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected !");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
}
