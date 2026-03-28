
import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import { rateLimit } from 'express-rate-limit'


const app = express();

/**
 * Middlewares
*/
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/**
 * Routes
*/
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/auth", authRouter);
app.use("/api/chat",rateLimit({
  windowMs:1*60*1000,
  max:10,
  message:"Too many Ai Request"
}),chatRouter)
app.use('/api/user',userRouter)
app.use(errorMiddleware);

export default app;
