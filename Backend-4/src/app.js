const express = require('express')
const app = express()

app.use(express.json())

const notes = []

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.send('Notes created !')
})

app.get('/notes', (req, res) => {
    res.send(notes)
})

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index] = req.body
    res.send('Note Updated')
})

app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.send('Note Deleted')
})

module.exports = app