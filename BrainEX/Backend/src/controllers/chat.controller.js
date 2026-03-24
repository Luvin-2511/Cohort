import chatModel from "../model/chat.mode.js";
import messageModel from "../model/message.model.js";
import { generateAiResponse, generateAiTitle } from "../services/ai.service.js";

/**
 * @route POST api/chat/
 * @description Answers the user's message
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function responseGenerateController(req, res) {
  const { message, chat: chatId } = req.body;
  const { id } = req.user;
  const aiResponse = await generateAiResponse(message);

  let aiTitle = null,chat = null
  if (!chatId) {
    aiTitle = await generateAiTitle(message);
    chat = await chatModel.create({
      user: id,
      title: aiTitle,
    });
  }else{
    const messages = await messageModel.find({chat:chatId})
  }

  const humanMessage = await messageModel.create({
    chat: chatId || chat._id,
    content:message,
    role:"user"
  })

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: aiResponse,
    role: "ai",
  });

  return res.status(201).json({
    response: aiResponse,
    title: aiTitle,
    chat,
    aiMessage,
  });
}
