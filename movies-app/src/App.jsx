import { useState, useCallback } from 'react';
import PaginationControl from './PaginationControl/PaginationControl.jsx';
import { Spin, Alert } from 'antd';
import './App.css';
import { fetchMovies } from "./api/movieDb.js";
import SearchBar from "./SearchBar/SearchBar.jsx";
import MoviesList from './MoviesList/MoviesList.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const loadMovies = useCallback(async (query, page = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchMovies(query, page);

      if (!data.results || data.results.length === 0) {
        throw new Error('Ничего не найдено');
      }

      setMovies(data.results.filter(movie => movie.poster_path));
      setTotalResults(data.total_results);
      setCurrentPage(page);

    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    loadMovies(query, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadMovies(searchQuery, page);
  };

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="content">
        {isLoading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <>
            <MoviesList movies={movies} />
            {movies.length > 0 && (
              <div className='pagination-container'>
                <PaginationControl
                  current={currentPage}
                  total={totalResults}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;