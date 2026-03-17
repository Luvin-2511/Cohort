import { useState } from "react";
import MovieCard from "../components/Moviecard";
import Navbar from "../../Shared/components/Navbar";
import "../styles/moviedetail.scss";

const IMG_BASE_BACKDROP = "https://image.tmdb.org/t/p/original";
const IMG_BASE_POSTER = "https://image.tmdb.org/t/p/w500";
const IMG_BASE_FACE = "https://image.tmdb.org/t/p/w185";

// dummy data for UI
const detail = {
  title: "Movie Title",
  overview: "Movie description goes here...",
  backdrop_path: null,
  vote_average: 8.5,
  vote_count: 12000,
  release_date: "2024-01-01",
  runtime: 148,
  genres: [{ id: 1, name: "Action" }, { id: 2, name: "Drama" }],
  spoken_languages: [],
  seasons: [],
}
const cast = []
const similar = []
const trailer = null
const type = "movie"

const MovieDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [watchModalOpen, setWatchModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const title = detail.title || "Untitled"
  const year = (detail.release_date || "").slice(0, 4)
  const runtime = detail.runtime ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m` : null
  const rating = detail.vote_average?.toFixed(1)
  const backdrop = detail.backdrop_path ? `${IMG_BASE_BACKDROP}${detail.backdrop_path}` : null

  return (
    <div className="detail">
      <Navbar />

      {/* Hero */}
      <section className="detail__hero">
        <div className="detail__hero-backdrop">
          {backdrop
            ? <img src={backdrop} alt={title} />
            : <div style={{ width: "100%", height: "100%", background: "#111" }} />
          }
        </div>
        <div className="detail__hero-gradient" />

        <div className="detail__hero-content">
          <div className="detail__hero-genres">
            {detail.genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>

          <h1 className="detail__hero-title">{title}</h1>

          <div className="detail__hero-meta">
            <span className="meta-item meta-item--rating">★ {rating}</span>
            <span className="meta-dot" />
            <span className="meta-item">{year}</span>
            {runtime && <><span className="meta-dot" /><span className="meta-item">{runtime}</span></>}
          </div>

          <p className="detail__hero-overview">{detail.overview}</p>

          <div className="detail__hero-actions">
            <button className="detail__hero-play" onClick={() => setModalOpen(true)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              WATCH TRAILER
            </button>

            <button className="detail__hero-watch" onClick={() => setWatchModalOpen(true)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              WATCH NOW
            </button>

            <button className="detail__hero-fav">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button className="detail__hero-fav">
              + WATCHLIST
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="detail__body">

        {/* Trailer Section */}
        <section className="detail__trailer-section">
          <p className="detail__trailer-section-label">◈ Trailer</p>
          <h2>WATCH THE TRAILER</h2>
          <div className="detail__trailer-unavailable">
            Trailer unavailable.
          </div>
        </section>

        {/* Watch Section */}
        <section className="detail__watch-section">
          <p className="detail__watch-section-label">◈ Streaming</p>
          <h2>WATCH THE MOVIE</h2>

          <div className="detail__watch-container">
            <div className="detail__watch-player-teaser" onClick={() => setWatchModalOpen(true)}>
              <div className="teaser-overlay">
                <div className="play-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>Click to stream Full Movie</span>
              </div>
              {backdrop && <img src={backdrop} alt="Teaser" />}
            </div>
          </div>
        </section>

        {/* Cast */}
        <section className="detail__cast-section">
          <h2>CAST</h2>
          <div className="detail__cast-grid">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="detail__cast-card">
                <img
                  className="detail__cast-card-img"
                  src="https://via.placeholder.com/185x278/111/333?text=?"
                  alt="Actor"
                />
                <p className="detail__cast-card-name">Actor Name</p>
                <p className="detail__cast-card-character">Character</p>
              </div>
            ))}
          </div>
        </section>

        {/* Similar */}
        <section className="detail__similar-section">
          <h2>YOU MIGHT ALSO LIKE</h2>
          <div className="detail__similar-grid">
          </div>
        </section>

      </div>
    </div>
  );
};

export default MovieDetail;