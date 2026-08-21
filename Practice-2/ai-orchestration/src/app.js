import express from 'express'
import morgan from 'morgan'
import agentRouter from './routes/agent.route.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.get('/api/ai/healthz', (req, res) => {
  res.status(200).json({
    message: 'Ai server Working Fine af !',
    status: 'ok'
  })
})

app.use('/api/ai', agentRouter)

export default app
