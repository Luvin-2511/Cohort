const express = require("express");
const converterRouter = require("./routes/converter.route");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use(express.json());
app.use("/api", converterRouter);

module.exports = app;