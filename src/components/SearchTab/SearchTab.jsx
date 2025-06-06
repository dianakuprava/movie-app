import { useState, useCallback } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import MoviesList from '../MoviesList/MoviesList.jsx';
import PaginationControl from '../PaginationControl/PaginationControl.jsx';
import { fetchMovies } from '../../API/movieDb.js';
import './SearchTab.css';

export default function SearchTab({ sessionId, onRatingUpdate }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [ratedMovies, setRatedMovies] = useState(() => {
    const saved = localStorage.getItem('ratedMovies');
    return saved ? JSON.parse(saved) : {};
  });

  const loadMovies = useCallback(async (query, page = 1) => {
    let isCancelled = false;

    try {
      if (!isCancelled) {
        setIsLoading(true);
        setError(null);
      }

      const data = await fetchMovies(query, page);

      if (!isCancelled) {
        setMovies(data.results);
        setTotalResults(data.total_results);
        setHasSearched(true);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setHasSearched(true);
      }
    } finally {
      if (!isCancelled) setIsLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query.trim()) {
      loadMovies(query, 1);
    } else {
      setMovies([]);
      setHasSearched(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadMovies(searchQuery, page);
  };

  const handleRatingUpdateLocal = (movieId, rating) => {
    const newRatedMovies = { ...ratedMovies, [movieId]: rating };
    setRatedMovies(newRatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(newRatedMovies));
    onRatingUpdate();
  };

  return (
    <div className="search-tab">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <MoviesList
        movies={movies.map((movie) => ({
          ...movie,
          rating: ratedMovies[movie.id] || 0,
        }))}
        isLoading={isLoading}
        error={error}
        sessionId={sessionId}
        hasSearched={hasSearched}
        onRatingUpdate={handleRatingUpdateLocal}
      />
      {movies.length > 0 && (
        <PaginationControl current={currentPage} total={totalResults} onChange={handlePageChange} />
      )}
    </div>
  );
}
