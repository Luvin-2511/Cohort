import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(expess.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/api/sandbox/healthz', (req, res) => {
  res.status(200).json({
    message: 'Sandbox server is going good',
    status: 'ok'
  })
})



export default app
