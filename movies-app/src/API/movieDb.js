const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
        );
        if (!response.ok) throw new Error('Ошибка API');
        return await response.json();
    } catch (error) {
        throw new Error('Не удалось загрузить фильмы');
    }
};