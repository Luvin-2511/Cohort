import express from "express";
import helmet from "helmet";

const app = express();
//Prevents attack like XSS 
app.use(helmet());
//Prevents iframe tag
app.use(helmet.frameguard({
    action: "deny",
}))

export default app;
