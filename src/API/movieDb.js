const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Не удалось загрузить фильмы');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Не удалось загрузить фильмы');
  }
};

export const createGuestSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Ошибка создания сессии');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Ошибка создания сессии');
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Ошибка загрузки жанров');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Ошибка загрузки жанров');
  }
};

export const rateMovie = async (movieId, rating, sessionId) => {
  try {
    if (rating < 0.5 || rating > 10) {
      throw new Error('Рейтинг должен быть от 0.5 до 10');
    }

    if (!sessionId) {
      throw new Error('Сессия не найдена');
    }

    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Ошибка оценки фильма');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Ошибка оценки фильма');
  }
};

export const fetchRatedMovies = async (sessionId, page = 1) => {
  try {
    if (!sessionId) {
      throw new Error('Сессия не найдена');
    }

    const response = await fetch(
      `${BASE_URL}/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&page=${page}&language=ru-RU`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Ошибка загрузки оцененных фильмов');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Ошибка загрузки оцененных фильмов');
  }
};
