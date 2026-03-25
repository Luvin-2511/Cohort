import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import {
  responseGenerateController,
  fetchAllChats,
  fetchMessagesOfChat,
} from "../controllers/chat.controller.js";
const chatRouter = Router();

chatRouter.post("/", authUserMiddleware, responseGenerateController);
chatRouter.get("/fetch-chats", authUserMiddleware, fetchAllChats);
chatRouter.get("/:chatId/messages", authUserMiddleware, fetchMessagesOfChat);

export default chatRouter;
