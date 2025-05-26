import './Movie.css';
import { formatMovieDate } from '../Utils/formatDate.js';
import { truncateText } from '../Utils/truncateText.js';


function Movie({ movieData }) {
  const { poster_path, title, release_date, overview } = movieData;

  return (
    <div className="movie">
      <div className="movie-img-wrapper">
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="movie-content">
        <div className="movie-header">
          <h1>{title}</h1>
          <div className="movie-rating"></div>
        </div>
        <div className="movie-text-content">
          <span className="movie-date">{formatMovieDate(release_date)}</span>
          <div className="movie-genres">
            <button>Action</button>
            <button>Drama</button>
          </div>
          <p className="movie-description">{truncateText(overview)}</p>
        </div>
        <div className="movie-stars"></div>
      </div>
    </div>
  );
}

export default Movie;