import { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import { createGuestSession, rateMovie } from './API/movieDb';
import AppTabs from './AppTabs/AppTabs';
import GenresProvider from './GenresProvider/GenresProvider';
import './App.css';

export default function App() {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('tmdb_session_id') || null;
  });
  const [loading, setLoading] = useState(true);
  const [ratedUpdateKey, setRatedUpdateKey] = useState(0);

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await createGuestSession();
        localStorage.setItem('tmbd_session_id', session.guest_session_id);
        setSessionId(session.guest_session_id);
      } catch (error) {
        message.error('Не удалось создать сессию');
      } finally {
        setLoading(false);
      }
    };

    if (!sessionId) initSession();
    else setLoading(false);
  }, [sessionId]);

  const handleRatingUpdate = async (movieId, rating) => {
    try {
      if (!movieId) {
        throw new Error("Movie ID is missing.");
      }

      await rateMovie(movieId, rating, sessionId);

      setRatedUpdateKey((prev) => prev + 1);

      message.success(`Фильм оценен на ${rating}`);
    } catch (error) {
      console.error('Ошибка при сохранении оценки:', error);
      message.error('Ошибка при сохранении оценки');
    }
  };

  if (loading) return <Spin />;
  return (
    <GenresProvider>
      <div className="app">
        <AppTabs
          sessionId={sessionId}
          onRatingUpdate={handleRatingUpdate}
          ratedUpdateKey={ratedUpdateKey}
        />
      </div>
    </GenresProvider>
  );
}
