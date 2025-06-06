import { useContext } from 'react';
import { GenresContext } from '../GenresProvider/GenresProvider';
import { formatMovieDate } from '../Utils/formatDate';
import { truncateText } from '../Utils/truncateText.js';
import MovieRating from '../MovieRating/MovieRating';
import MovieRateStars from '../MovieRateStars/MovieRateStars';
import './Movie.css';

function Movie({ movieData, sessionId, onRatingUpdate }) {
  const genres = useContext(GenresContext);
  const movieGenres = genres.filter((g) => movieData.genre_ids?.includes(g.id));

  return (
    <div className="movie">
      <div className="movie-poster">
        {movieData.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            className="movie-poster-img"
          />
        ) : (
          <div className="poster-placeholder">No Poster</div>
        )}
      </div>
      <div className="movie-main-info">
        <div className="movie-header">
          <h2 className="movie-title">{movieData.title}</h2>
          <MovieRating rating={movieData.vote_average || 0} />
        </div>
        <span className="movie-date">{formatMovieDate(movieData.release_date)}</span>
        <div className="movie-genres">
          {movieGenres.map((genre) => (
            <span key={genre.id} className="movie-genre">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <p className="movie-description">{truncateText(movieData.overview)}</p>

      {sessionId && (
        <div className="movie-rating">
          <MovieRateStars
            movieId={movieData.id}
            sessionId={sessionId}
            initialRating={movieData.rating || 0}
            onRatingUpdate={onRatingUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default Movie;
