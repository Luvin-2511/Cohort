import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    axios.get("/api/data").then((res) => {
      setMovie(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <main>
      {movies.map((movie) => {
        return (
          <div key={movie.title}>
            <h2>{movie.title}</h2>
            <h3>{movie.director}</h3>
            <h5>{movie.year}</h5>
          </div>
        );
      })}
    </main>
  );
}

export default App;
