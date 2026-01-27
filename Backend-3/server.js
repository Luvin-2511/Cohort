const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const notes = []

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send('Notes created !')
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})