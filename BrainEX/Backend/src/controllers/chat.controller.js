import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import {
  generateAiResponse,
  generateAiTitle,
  generateRandomPrompt,
} from "../services/ai.service.js";
import { getIO } from "../sockets/server.socket.js";

/**
 * @route POST api/chat/
 * @description Answers the user's message
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function responseGenerateController(req, res, next) {
  try {
    const { message, chat: chatId } = req.body;
    const { id } = req.user;
    const io = getIO()
    let title = null,
      chat = null;
    if (!chatId) {
      title = await generateAiTitle(message);
      chat = await chatModel.create({
        user: id,
        title: title,
      });
    }
    const userMessage = await messageModel.create({
      role: "user",
      content: message,
      chat: chatId || chat._id,
    });

    
    const messages = await messageModel
    .find({
      chat: chatId || chat._id,
    })
    .sort({ createdAt: 1 })
    .limit(5);
    const aiResponse = await generateAiResponse(messages);
    const roomId = chatId || chat._id.toString()

    for(let char of aiResponse){
      io.to(roomId).emit("ai typing",char)
      await new Promise(r=>setTimeout(r, 15))
    }

    const aiMessage = await messageModel.create({
      role: "ai",
      content: aiResponse,
      chat: chatId || chat._id,
    });

    return res.status(201).json({
      success: true,
      message: "Response generated !",
      userMessage,
      aiMessage,
      chat: chatId || chat._id,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/chat/fetch-chats
 * @description Fetches all chat of a particular user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function fetchAllChats(req, res, next) {
  try {
    const { id } = req.user;
    if (!id) {
      return next({
        status: 404,
        message: "Unauthorized User !",
      });
    }

    const chats = await chatModel
      .find({
        user: id,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All chats fetched succesfully",
      chats,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/chat/:chatId/messages
 * @description Fetches all messages of a particular chat using chatId
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function fetchMessagesOfChat(req, res, next) {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return next({
        status: 400,
        message: "Chat Id is required !",
      });
    }
    const { id } = req.user;
    const isValidChat = await chatModel.findOne({
      user: id,
      _id: chatId,
    });

    if (!isValidChat) {
      return next({
        status: 403,
        message: "Chat not found or access denied",
      });
    }
    const messages = await messageModel.find({
      chat: chatId,
    });

    return res.status(200).json({
      success: true,
      message: "Messages feteched successfully !",
      messages,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route DELETE api/chat/:chatId/delete
 * @description Deletes a chat
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteChatController(req, res, next) {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return next({
        status: 400,
        message: "Chat id is required !",
      });
    }
    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return next({
        status: 403,
        message: "Unauthorized or chat not found",
      });
    }

    const message = await messageModel.deleteMany({
      chat: chatId,
    });
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully !",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route PATCH api/chat/:chatId/updateTitle
 * @description Updates the title of a chat
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateTitleController(req, res, next) {
  try {
    const { chatId } = req.params;
    const { title } = req.body;
    if (!title || !title.trim()) {
      return next({
        status: 400,
        message: "Title is required",
      });
    }
    if (!chatId) {
      return next({
        status: 400,
        message: "Chat id is required !",
      });
    }
    const updatedTitle = await chatModel.findOneAndUpdate(
      {
        _id: chatId,
        user: req.user.id,
      },
      {
        title: title,
      },
      { returnDocument: "after" },
    );

    if (!updatedTitle) {
      return next({
        status: 400,
        message: "Invalid chat",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Title Updated",
      updatedTitle,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/chat/random-prompt
 * @description Generates random prompt that the user can search
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function generatePromptController(req, res) {
  const { number } = req.body;
  if (!number) {
    return res
      .status(400)
      .json({ success: false, message: "Number is required" });
  }

  const num = parseInt(number);
  const response = await generateRandomPrompt(num);
  return res.status(200).json({
    success: true,
    response,
  });
}
