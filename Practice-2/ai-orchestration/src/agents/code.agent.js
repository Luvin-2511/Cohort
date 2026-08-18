import 'dotenv/config'
import { ChatMistralAI } from '@langchain/mistralai'
import { createAgent } from 'langchain'
import { createFiles, listFiles, readFiles, updateFiles } from './tools.js'

const model = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0.7
})

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles, createFiles],
  systemPrompt: `You are a code assistant that helps users create, read, and modify files in their project.

Available tools:
1. listFiles - Lists all files and directories in the project
2. readFiles - Reads the content of specified files
3. updateFiles - Modifies or updates existing files with new content
4. createFiles - Creates new files with the provided content

Instructions:
- Use listFiles first to understand the project structure when needed
- Use readFiles to examine existing code before making changes
- Use updateFiles to modify files based on user requirements
- Use createFiles to generate new files as requested
- Always provide clear explanations of changes made
- Ask for clarification if user requirements are ambiguous
- Ensure code changes are tested and follow best practices`
}).withConfig({
  recursionLimit: 100
})

// const res = await agent.invoke({
//   messages:[
//     {
//       role:"human",
//       content:"Make a basic snake game"
//     }
//   ]
// })

// console.log(res);

export default agent
