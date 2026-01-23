const express = require('express')
const app = express()
let port = 3000

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.get('/about',(req,res)=>{
    res.send("This is the about page")
})

app.listen(port)