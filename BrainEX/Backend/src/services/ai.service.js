import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateAiResponse(messages) {
  const response = await geminiModel.invoke(
    messages.map((message) => {
      if (message.role == "ai") {
        return new AIMessage(message.content);
      } else {
        return new HumanMessage(message.content);
      }
    }),
  );
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

export async function generateRandomPrompt(n) {
  if (isNaN(n) || n <= 0) throw new Error("Invalid number of prompts");
  const response = await mistralModel.invoke([
    new HumanMessage(`Generate random ${n} promts that the user can search just provide the prompts without numbering nothing else`),
  ]);

  return response.content.split('\n')
}

export async function* generateAiResponseStream(messages) {
  const stream = await geminiModel.stream(
    messages.map((message) => {
      if (message.role === "ai") {
        return new AIMessage(message.content);
      } else {
        return new HumanMessage(message.content);
      }
    })
  );

  for await (const chunk of stream) {
    const token =
      typeof chunk.content === "string"
        ? chunk.content
        : chunk.content?.[0]?.text || "";

    if (!token) continue;

    yield token;
  }
}