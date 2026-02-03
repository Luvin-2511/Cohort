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

module.exports = app