const express = require('express')
const app = express()

app.use(express.json())

const notes = []

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.send('Notes created !')
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

module.exports = app