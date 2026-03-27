import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import {
  responseGenerateController,
  fetchAllChats,
  fetchMessagesOfChat,
  deleteChatController,
  updateTitleController,
  generatePromptController
} from "../controllers/chat.controller.js";
const chatRouter = Router();

chatRouter.post("/", authUserMiddleware, responseGenerateController);
chatRouter.delete("/:chatId/delete", authUserMiddleware, deleteChatController);
chatRouter.get("/fetch-chats", authUserMiddleware, fetchAllChats);
chatRouter.get("/:chatId/messages", authUserMiddleware, fetchMessagesOfChat);
chatRouter.patch("/:chatId/updateTitle", authUserMiddleware, updateTitleController);
chatRouter.post("/random-prompt", authUserMiddleware, generatePromptController);

export default chatRouter;
