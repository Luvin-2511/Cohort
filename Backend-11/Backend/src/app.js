const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const connectToDb = require("../config/connection");
const noteModel = require("../model/note.model");

connectToDb();

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note posted successfully !",
    notes,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Note fetched successfully !",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note Deleted successfully !",
    notes,
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  const notes = await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message:"Note Updated Successfully !",
    notes
  })
});

module.exports = app;
