
import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";

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

app.use("/api/auth", authRouter);
app.use("/api/chat",chatRouter)
app.use(errorMiddleware);

export default app;
