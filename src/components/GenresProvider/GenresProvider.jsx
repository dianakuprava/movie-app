import { createContext, useState, useEffect } from 'react';
import { fetchGenres } from '../../API/movieDb.js';

export const GenresContext = createContext();

export default function GenresProvider({ children }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Ошибка загрузки жанров', error);
      }
    };
    loadGenres();
  }, []);

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
}
