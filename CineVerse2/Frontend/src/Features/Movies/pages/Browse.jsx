import MovieCard from "../components/Moviecard";
import Navbar from "../../Shared/components/Navbar";
import "../styles/browse.scss";
import useMovies from "../hooks/useMovies";
import { useEffect, useRef } from "react";

const CATEGORIES = [
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
  { key: "now_playing", label: "Now Playing" },
  { key: "top_rated", label: "Top Rated" },
];

const GENRES = [
  { id: "", name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Documentary" },
];

const Browse = () => {
  const {
    movies,
    setPage,
    page,
    category,
    fetchMovies,
    setCategory,
    genre,
    selectedGenre,
    setselectedGenre,
    handleParticularGenre,
  } = useMovies();
  const sentinalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMovies(category, page + 1);
        setPage((prev) => prev + 1);
      }
    });

    if (sentinalRef.current) observer.observe(sentinalRef.current);
    return () => observer.disconnect();
  }, [page, category]);
  console.log(genre);

  return (
    <div className="browse">
      <Navbar />

      {/* Header */}
      <div className="browse__header">
        <p className="browse__header-eyebrow">◈ Explore</p>
        <h1 className="browse__header-title">
          {category.split("_").join(" ")}
        </h1>
      </div>

      {/* Controls */}
      <div className="browse__controls">
        <div className="browse__tabs">
          {CATEGORIES.map((cat) => (
            <button
              onClick={() => {
                setselectedGenre(null)
                setCategory(cat.key);
                setPage(1);
              }}
              key={cat.key}
              style={{
                backgroundColor: `${category == cat.key ? "#e8ff00" : ""}`,
                color: `${category == cat.key ? "black" : ""}`,
              }}
              className="browse__tab"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="browse__search">
          <svg
            className="browse__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search movies, shows..." />
        </div>

        <div className="browse__genre">
          {genre != null &&
            genre.map((g) => (
              <button
                onClick={() => {
                  handleParticularGenre(g.id)
                  setselectedGenre(g);
                }}
                style={{
                  backgroundColor: `${selectedGenre?.name == g.name ? "#e8ff00" : ""}`,
                  color: `${selectedGenre?.name == g.name ? "black" : ""}`,
                }}
                key={g.id}
                className="browse__genre-btn"
              >
                {g.name}
              </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="browse__grid">
        {movies.length == 0 ? (
          <div className="browse__empty">
            <div className="empty-icon">🎬</div>
            <h3>NOTHING FOUND</h3>
            <p>Try a different search or category.</p>
          </div>
        ) : (
          <>
            {movies.map((movie) => {
              return <MovieCard features={movie} />;
            })}
          </>
        )}
      </div>

      <div ref={sentinalRef} className="sentinal-page"></div>
    </div>
  );
};

export default Browse;
