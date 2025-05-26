import { Spin, Alert, Empty } from 'antd';
import Movie from '../Movie/Movie.jsx';

const MoviesList = ({ movies, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error === 'Ничего не найдено' ? (
          <Empty description="Ничего не найдено. Попробуйте другой запрос." />
        ) : (
          <Alert message="Ошибка" description={error} type="error" showIcon />
        )}
      </div>
    );
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <Movie key={movie.id} movieData={movie} />
      ))}
    </div>
  );
};

export default MoviesList;