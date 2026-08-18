import express, { urlencoded } from 'express'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(express.static(urlencoded({ extended: true })))
app.use(morgan('dev'))

app.get('/api/sandbox/health',(req,res)=>{
    return res.status(200).json({
        status:'ok',
        message:"Sandbox service is working at pinacle of its peak !"
    })
})

export default app