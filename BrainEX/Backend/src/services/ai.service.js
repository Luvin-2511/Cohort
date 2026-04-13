import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, tool } from "langchain";
import { tavily as Tavily } from "@tavily/core";
import * as z from "zod";

const tavily = new Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Search the internet for relevant information to answer user queries. Use this tool when you need to find up-to-date information or specific details that are not available in your training data.",
  schema: z.object({
    query: z.string().describe("The search query to look up to the internet"),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

export async function generateAiResponse(messages) {
  const response = await agent.invoke({
    messages: messages.map((message) => {
      if (message.role == "ai") {
        return new AIMessage(message.content);
      } else {
        return new HumanMessage(message.content);
      }
    }),
  });

  return response.messages[response.messages.length - 1].text;
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
    new HumanMessage(
      `Generate random ${n} promts that the user can search just provide the prompts without numbering nothing else`,
    ),
  ]);

  return response.content.split("\n");
}

export async function* generateAiResponseStream(messages) {
  const stream = await geminiModel.stream(
    messages.map((message) => {
      if (message.role === "ai") {
        return new AIMessage(message.content);
      } else {
        return new HumanMessage(message.content);
      }
    }),
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

export async function searchInternet({ query }) {
  return await tavily.search(query, {
    maxResults: 5,
    searchDepth: "advanced",
  });
}
