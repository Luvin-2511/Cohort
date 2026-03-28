import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const geminiModel = new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash",
    apiKey:""
})

export async function testAi(){
    const response = await geminiModel.invoke(
        [new HumanMessage('Hello what"s up')]
    )
    console.log(response.text)
}