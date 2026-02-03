const express = require('express')
const app = express()
app.use(express.json())
const connectToDB = require('../config/connection')
connectToDB()
const noteModel = require('../model/notes.model')


app.post('/api/notes',async (req, res) => {
    const { title, description } = req.body
    const notes = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:'Notes posted successfully',
        notes
    })
})

app.get('/api/notes',async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"Notes fetched successfully !",
        notes
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    const notes = await noteModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"Note deleted successfully !",
        notes
    })
})

app.patch('/api/notes/:id',(req,res)=>{
    const notes = noteModel.findByIdAndUpdate(req.params.id,{
       "description":req.body
    })
    res.status(200).json({
        message:"Note updated successfully !",
        notes
    })
})

module.exports = app