import { useState, useEffect } from 'react';
import { Spin, Empty, Alert } from 'antd';
import MoviesList from '../MoviesList/MoviesList';
import { fetchRatedMovies } from '../API/movieDb';
import PaginationControl from '../PaginationControl/PaginationControl';
import './RatedTab.css';

export default function RatedTab({ sessionId, ratingUpdated }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadRatedMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!sessionId) {
          setError("Необходимо создать сессию для получения оцененных фильмов");
          return;
        }

        const data = await fetchRatedMovies(sessionId, currentPage);
        console.log("Fetched movies:", data.results);

        if (isActive) {
          setMovies(data.results || []);
          setTotalResults(data.total_results || 0);
        }
      } catch (err) {
        if (isActive) {
          console.error("Error loading rated movies:", err);
          setError(err.message);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    if (sessionId) {
      loadRatedMovies();
    }

    return () => {
      isActive = false;
    };
  }, [sessionId, currentPage, ratingUpdated]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleRatingUpdate = () => {
    setCurrentPage(1);
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
        movies={movies}
        isLoading={loading}
        error={error}
        sessionId={sessionId}
        hasSearched={true}
        showUserRating={true}
        onRatingUpdate={handleRatingUpdate}
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
