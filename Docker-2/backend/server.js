import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send("Health Check !")
})

app.listen(3000,()=>{
    console.log("Server listening at PORT: 3000")
})