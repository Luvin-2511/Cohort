import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";

const mistralModel = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRAL_API_KEY,
});

const mistralEmbeddings = new MistralAIEmbeddings({
    model:'mistral-embed'
})

export async function generateTags(content, title) {
   const shortContent =  content?.slice(0, 1000) || ""
  const prompt = `
    Suggest 3-5 short lowercase tags for this content. Return only a JSON array.

    Title: ${title}
    Content: ${shortContent}
    `;

  const response = await mistralModel.invoke([
    new SystemMessage("You are a precise tagging assistant."),
    new HumanMessage(prompt),
  ]);

  const raw = response.content
  const json = raw.match(/\[.*\]/s)?.[0];
  return json ? JSON.parse(json) : [];
}

export async function generateEmbedding(content,title) {
    const textToEmbed = [title, content].join(" ").slice(0, 2000)
    const embeddings = await mistralEmbeddings.embedQuery(textToEmbed)
    return embeddings
}

export async function generateInsights(content, title, type) {
  const shortContent = content?.slice(0, 1500) || "";
  const prompt = `
    Analyze this ${type} content and provide 2-3 brief, insightful bullet points. Return only a JSON array of strings. Do not include markdown or numbering.

    Title: ${title}
    Content: ${shortContent}
  `;

  try {
    const response = await mistralModel.invoke([
      new SystemMessage("You are an insightful summarizing assistant. Only output a strict JSON array of strings. Do not include markdown code block syntax formatting or backticks around the json, just the raw json array string."),
      new HumanMessage(prompt),
    ]);
    
    let raw = response.content.trim();
    // In case the model still outputs markdown backticks, strip them
    if (raw.startsWith('```json')) raw = raw.slice(7);
    if (raw.startsWith('```')) raw = raw.slice(3);
    if (raw.endsWith('```')) raw = raw.slice(0, -3);
    raw = raw.trim();

    return JSON.parse(raw);
  } catch (err) {
    console.error("AI Insight Error:", err);
    return [];
  }
}
