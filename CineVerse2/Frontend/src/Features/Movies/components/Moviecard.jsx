import "../styles/moviecard.scss";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({features}) => {
  return (
    <div id={features.id} className="movie-card">
      <div className="movie-card__poster">
        <img
          src={`${IMG_BASE}/${features.poster_path}`}
          alt={features.original_title}
          loading="lazy"
        />

        <div className="movie-card__overlay">
          <button className="movie-card__play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <span className="movie-card__type">{features.media_type==="tv"?"TV":"FILM"}</span>

        <span className="movie-card__rating" style={{ 
          "--rc": features.vote_average<6?"#f58f00":features.vote_average<8?"#00bff3":"#e8ff00"
          }}>
          ★ {features.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="movie-card__info">
      <h3 className="movie-card__title">{features.original_title}</h3>
        <span className="movie-card__year">{features.release_date.split('-')[0]}</span>
      </div>
    </div>
  );
};

export default MovieCard;