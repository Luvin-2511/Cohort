const express = require('express')
const app = express()

app.use(express.json())

const notes = []

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        message: "Notes posted successfully !",
        notes
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes fetched successfully !",
        notes
    })
})

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index] = req.body
    res.status(200).json({
        message: "Note update successfully !",
        notes
    })
})

app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.status(204).json({
        message: "Note deleted successfully !",
        notes
    })
})

module.exports = app