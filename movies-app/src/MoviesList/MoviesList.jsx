import { Spin, Alert, Empty } from 'antd';
import Movie from '../Movie/Movie';
import './MovieList.css';

const MoviesList = ({ movies, isLoading, error, sessionId, hasSearched, onRatingUpdate }) => {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spin/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <Alert message="Ошибка" description={error} type="error" showIcon />
      </div>
    );
  }

  if (hasSearched && movies.length === 0) {
    return (
      <div className="empty-message">
        <Empty description="Ничего не найдено" />
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <Movie
          key={movie.id}
          movieData={movie}
          sessionId={sessionId}
          onRatingUpdate={onRatingUpdate}
        />
      ))}
    </div>
  );
};

export default MoviesList;