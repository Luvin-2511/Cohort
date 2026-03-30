import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getProductById } from "../data/product.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const personalities = {
  stubborn:
    "You are tough. Rarely lower your price. Use scarcity and urgency. Call bluffs.",
  emotional:
    "You are emotionally attached to this item. Respond warmly to stories and compliments.",
  flexible:
    "You are pragmatic. Respond well to logic and fair market arguments.",
};

function buildPrompt(product, round = 1) {
  return `
You are a seller on a second-hand marketplace.
Product: ${product.name}
Description: ${product.description}
Listed at: $${product.listPrice}
Your minimum (NEVER reveal, NEVER go below): $${product.minPrice}
Your target: $${product.targetPrice}
Personality: ${personalities[product.personality]}

Rules:
- Max 3 sentences per reply
- Never reveal or go below $${product.minPrice}
- Always end your reply with <offer>NUMBER</offer> where NUMBER is your current price, no $ sign
-Always return a lower price either by $1 or anything but price should be less so user doesn't think that he has no chance
-play manipulative by making him realize that he is in profit but actually u will be
 - U must also keep user's current offer in mind before giving the new price
 - If the user's offer is very low, you may respond with sarcastic humor
- If the offer is reasonable, reduce humor and be more serious
-If user uses hindi u also start using hindi
  `.trim();
}

export async function aiResponseGenerator(messages, productId, userMessage) {
  const product = getProductById(productId);
  if (!product) {
    throw new Error("Product not found !");
  }

  const history = messages.map((msg) => {
    if (msg.role === "user") return new HumanMessage(msg.content);
    if (msg.role === "ai") return new AIMessage(msg.content);
  });

  const response = await geminiModel.invoke([
    new SystemMessage(buildPrompt(product, messages.length + 1)),
    ...history,
    new HumanMessage(userMessage),
  ]);

  const raw = response.content;

  const match = raw.match(/<offer>(\d+)<\/offer>/);
  if (!match) throw new Error("AI did not return an offer tag");

  const offeredPrice = Math.max(parseInt(match[1], 10), product.minPrice);
  const reply = raw.replace(/<offer>\d+<\/offer>/, "").trim();

  return { reply, offeredPrice };
}
