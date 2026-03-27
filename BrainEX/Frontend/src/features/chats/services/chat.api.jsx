import { io } from "socket.io-client";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export function initializeSocket() {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connection Established !");
  });
  
  return socket;
}

export async function fetchChats() {
  try {
    const response = await api.get("/api/chat/fetch-chats");
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchMessageOfChat(chatId) {
  try {
    const response = await api.get(`/api/chat/${chatId}/messages`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteChat(chatId) {
  try {
    const response = await api.delete(`/api/chat/${chatId}/delete`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getResponse(message, chatId) {
  try {
    const response = await api.post("/api/chat/", {
      message: message,
      chat: chatId,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getRandomPrompt(number) {
  try {
    const response = await api.post("/api/chat/random-prompt", {
      number: number,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
