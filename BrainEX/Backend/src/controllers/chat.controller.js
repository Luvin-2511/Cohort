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
  const { message,chat:chatId } = req.body;
  const {id} = req.user
  let title = null , chat = null
  if(!chatId){
    title = await generateAiTitle(message)
    chat = await chatModel.create({
      user:id,
      title:title,
    })
  }
  const userMessage = await messageModel.create({
    role:'user',
    content:message,
    chat:chatId||chat._id
  })
  
  const messages = await messageModel.find({
    chat:chatId||chat._id
  })
  const aiResponse = await generateAiResponse(messages)
  
  const aiMessage = await messageModel.create({
    role:'ai',
    content:aiResponse,
    chat:chatId||chat._id
  })

  return res.status(201).json({
    success:true,
    message:"Response generated !",
    userMessage,
    aiResponse,
  })
}

/**
 * @route POST api/chat/fetch-chats
 * @description Fetches all chat of a particular user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function fetchAllChats(req, res) {
  const { id } = req.user;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Unauthorized User !",
    });
  }

  const chats = await chatModel.find({
    user: id,
  });

  return res.status(200).json({
    success: true,
    message: "All chats fetched succesfully",
    chats,
  });
}

/**
 * @route POST api/chat/chatId:/messages
 * @description Fetches all messages of a particular chat using chatId
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function fetchMessagesOfChat(req, res) {
  const {chatId} = req.params;
  if(!chatId){
    return res.status(400).json({
      success:false,
      message:"Chat Id is required !"
    })
  }
  const {id} = req.user;
  const isValidChat = await chatModel.findOne({
    user:id,
    _id:chatId,
  })

  if(!isValidChat){
    return res.status(403).json({
      success:false,
      message:"Chat not found or access denied"
    })
  }
  const messages = await messageModel.find({
    chat:chatId
  })

  return res.status(200).json({
    success:true,
    message:"Messages feteched successfully !",
    messages
  })
}
