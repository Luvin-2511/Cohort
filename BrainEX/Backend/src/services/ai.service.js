import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateAiResponse(message) {
  const response = await geminiModel.invoke([new HumanMessage(message)]);
  return response.text;
}

export async function generateAiTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      "Generate a title in max 5 words. Only return the title. No extra text.",
    ),
    new HumanMessage(`Conversation: ${message}`),
  ]);
  return response.text;
}
