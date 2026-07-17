import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.static("public"))


app.get('/',(req,res)=>{
    res.send("Health Check")
})

app.get('/api/data',(req,res)=>{
    const movies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-Fi"
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genre: "Action"
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Sci-Fi"
  },
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    genre: "Thriller"
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999,
    genre: "Sci-Fi"
  }
];
    res.json(movies)
})

app.get('*name',(req,res)=>{
  res.sendFile('/public/index.html',{root:__dirname})
})

app.listen(3000, () => {
    console.log("Server running on PORT:3000")
})