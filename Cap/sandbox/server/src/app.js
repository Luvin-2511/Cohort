import express, { urlencoded } from "express";
import morgan from "morgan";
import {v7 as uuid} from 'uuid'
import { createService } from "./kubernetes/service";

const app = express();
app.use(express.json())
app.use(express.static(urlencoded({ extended: true })))
app.use(morgan('dev'))

app.get('/api/sandbox/health',(req,res)=>{
    res.status(200).json({
        status:'ok',
        message:"Sandbox service is running at its peak !"
    })
})

app.post('/api/sandbox/start',(req,res)=>{
    const sandboxId = uuid()

    await Promise.all([
        createPod(sandboxId),
        createService(sandboxId)
    ])

    return res.status(200).json({
        message:"Sandbox environment Created successfully !",
        sandbox:sandboxId,
        previewUrl:`http:${sandboxId.preview.localhost}`
    })
})

export default app;
