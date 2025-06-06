import { useState, useEffect } from 'react';
import { Spin, Empty, Alert } from 'antd';
import MoviesList from '../MoviesList/MoviesList';
import { fetchRatedMovies } from '../API/movieDb';
import PaginationControl from '../PaginationControl/PaginationControl';
import './RatedTab.css';

export default function RatedTab({ sessionId, ratingsVersion }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [ratedMovies] = useState(() => {
    const saved = localStorage.getItem('ratedMovies');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    let isCancelled = false;

    const loadRatedMovies = async () => {
      try {
        if (!isCancelled) setLoading(true);
        const data = await fetchRatedMovies(sessionId, currentPage);
        if (!isCancelled) {
          setMovies(data.results || []);
          setTotalResults(data.total_results || 0);
        }
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    if (sessionId) loadRatedMovies();

    return () => {
      isCancelled = true;
    };
  }, [sessionId, currentPage, ratingsVersion]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (!sessionId) {
    return (
      <Alert
        message="Требуется сессия"
        description="Пожалуйста, выполните поиск для создания сессии"
        type="info"
        showIcon
      />
    );
  }

  if (loading && currentPage === 1) {
    return (
      <div className="rated-tab-spinner">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  if (movies.length === 0) {
    return <Empty description="Вы еще не оценили ни одного фильма" />;
  }

  return (
    <div className="rated-tab">
      <MoviesList
        movies={movies.map((movie) => ({
          ...movie,
          rating: ratedMovies[movie.id] || 0,
        }))}
        isLoading={loading}
        error={error}
        sessionId={sessionId}
        hasSearched={true}
      />

      {totalResults > 20 && (
        <PaginationControl
          current={currentPage}
          total={totalResults}
          onChange={handlePageChange}
          disabled={loading}
        />
      )}
    </div>
  );
}
