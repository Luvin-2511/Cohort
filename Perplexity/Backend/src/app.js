import 'dotenv/config';
import express from "express";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser())

/**
 * Routes
 */
import authRouter from './routes/auth.route.js';
app.use('/api/auth',authRouter)

export default app;
