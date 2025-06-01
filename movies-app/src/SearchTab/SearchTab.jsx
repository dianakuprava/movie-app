import { useState, useCallback } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import PaginationControl from '../PaginationControl/PaginationControl';
import { fetchMovies } from '../API/movieDb';
import './SearchTab.css';

export default function SearchTab({ sessionId, onRatingUpdate }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const loadMovies = useCallback(async (query, page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMovies(query, page);
      setMovies(data.results.filter(movie => movie.poster_path));
      setTotalResults(data.total_results);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="search-tab">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <MoviesList
        movies={movies}
        isLoading={isLoading}
        error={error}
        sessionId={sessionId}
        hasSearched={hasSearched}
        onRatingUpdate={onRatingUpdate}
      />
      {movies.length > 0 && (
        <PaginationControl
          current={currentPage}
          total={totalResults}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}