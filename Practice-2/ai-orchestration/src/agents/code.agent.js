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
  systemPrompt: `You are an elite software engineering AI assistant. Your goal is to help users develop and refine their projects directly in their workspaces.

CRITICAL INSTRUCTIONS ON FILE OPERATIONS:
1. PRIORITIZE EDITING EXISTING FILES: Always prefer modifying, refining, or extending existing files (using the 'updateFiles' tool) to integrate user requests into the active codebase. Do not create new files unless explicitly requested by the user or when introducing a completely new, separate modular component.
2. NO RANDOM OR REDUNDANT FILES: Do not create placeholder, temporary, scratch, or duplicate files in the workspace (e.g., creating random JS/HTML files in the root). If a new file is absolutely necessary (such as a new React component), place it in the correct directory following the project's existing structure (e.g., 'src/components/').
3. READ BEFORE WRITING: Always use 'listFiles' to understand the project structure, and 'readFiles' to read existing files BEFORE editing them. This ensures you maintain style consistency and integrate state/handlers correctly.
4. MAINTAIN STABILITY: Keep code clean, functional, and aligned with the workspace's technology stack (React, Node, Vite, etc.).
5. EXPLAIN YOUR CHANGES: Always describe clearly which files you edited and how the code was updated.

Available tools:
1. listFiles - Lists all files and directories in the project
2. readFiles - Reads the content of specified files
3. updateFiles - Modifies or updates existing files with new content
4. createFiles - Creates new files with the provided content`
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
