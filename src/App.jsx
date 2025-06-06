import { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import { createGuestSession } from './API/movieDb';
import AppTabs from './components/AppTabs/AppTabs.jsx';
import GenresProvider from './GenresProvider/GenresProvider';
import './App.css';

export default function App() {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('tmdb_session_id') || null;
  });
  const [loading, setLoading] = useState(true);
  const [ratingsVersion, setRatingsVersion] = useState(0);

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await createGuestSession();
        localStorage.setItem('tmdb_session_id', session.guest_session_id);
        setSessionId(session.guest_session_id);
      } catch (error) {
        console.error(error);
        message.error('Не удалось создать сессию');
      } finally {
        setLoading(false);
      }
    };

    if (!sessionId) initSession();
    else setLoading(false);
  }, [sessionId]);

  const handleRatingUpdate = () => {
    setRatingsVersion((prev) => prev + 1);
  };

  if (loading) return <Spin />;

  return (
    <>
      <h1 style={{ display: 'none' }}>Movie Search App</h1>
      <GenresProvider>
        <div className="app">
          <AppTabs
            sessionId={sessionId}
            onRatingUpdate={handleRatingUpdate}
            ratingsVersion={ratingsVersion}
          />
        </div>
      </GenresProvider>
    </>
  );
}
