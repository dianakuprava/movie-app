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
        <img
          src={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : 'https://via.placeholder.com/183x281?text=No+Image'
          }
          alt={movieData.title}
        />
      </div>
      <div className="movie-main-info">
        <div className="movie-header">
          <h1 className="movie-title">{movieData.title}</h1>
          <MovieRating rating={movieData.vote_average} />
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
            initialRating={movieData.rating}
            onRatingUpdate={onRatingUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default Movie;
