const { Router } = require("express");
const {
  converterController,
  videoInfoController,
} = require("../controllers/converter.controller");
const converterRouter = Router();

converterRouter.get("/convert", converterController);
converterRouter.get("/info", videoInfoController);

module.exports = converterRouter;
