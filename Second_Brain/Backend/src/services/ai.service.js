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
