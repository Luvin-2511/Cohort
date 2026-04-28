import express, { urlencoded } from "express";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CONFIG } from "./config/config";

const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.static(urlencoded({ extended: true })));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(passport.initialize());
passport.use(
  new GoogleStrategy({
    clientID: CONFIG.GOOGLE_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  }),
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  },
);

/**
 * Routes
 */
app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
