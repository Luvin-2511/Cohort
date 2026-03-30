import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function getAiResponse(messages, productId, userMessage) {
  try {
    const response = await api.post("/api/game/ai-response", {
      messages,
      productId,
      userMessage,
    });
    return response.data;
  } catch (err) {
    throw err
  }
}


