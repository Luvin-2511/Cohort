import { Router } from 'express'
import agent from '../agents/code.agent.js'

const agentRouter = Router()

agentRouter.post('/invoke', async (req, res) => {
  try {
    const { message, projectId } = req.body

    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive'
    })

    const writer = (text) => {
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify(text)}\n\n`)
      }
    }

    const response = await agent.stream(
      {
        messages: [
          {
            role: 'human',
            content: message
          }
        ]
      },
      {
        context: { projectId, writer },
        streamMode: ['custom', 'values']
      }
    )

    let lastState
    for await (const chunk of response) {
      const [mode, data] = chunk
      if (mode === 'custom') {
        res.write(`data: ${JSON.stringify(data)}\n\n`)
      } else if (mode === 'values') {
        lastState = data
      }
    }

    if (lastState && lastState.messages) {
      const messages = lastState.messages
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i]
        const type = typeof msg._getType === 'function' ? msg._getType() : (msg.role || msg.type)
        if ((type === 'ai' || type === 'assistant') && msg.content && (!msg.tool_calls || msg.tool_calls.length === 0)) {
          res.write(`data: ${JSON.stringify({ type: 'final', content: msg.content })}\n\n`)
          break
        }
      }
    }
    res.end()
  } catch (err) {
    console.log(`Error occured while invoking agent :${err}`)
    if (!res.headersSent) {
      res.status(500).json({ message: err.message, status: 'error' })
    } else {
      res.end()
    }
  }
})

export default agentRouter
