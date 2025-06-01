import { Rate, message } from 'antd';
import { useState, useEffect } from 'react';
import { rateMovie } from '../API/movieDb';
import './MovieRateStars.css';

export default function MovieRateStars({ movieId, sessionId, initialRating = 0, onRatingUpdate }) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRate = async (value) => {
    try {
      setLoading(true);
      await rateMovie(movieId, value, sessionId);
      setRating(value);
      if (onRatingUpdate) onRatingUpdate(movieId, value);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stars-container">
      <Rate
        value={rating}
        onChange={handleRate}
        count={10}
        allowHalf
        disabled={loading || !sessionId}
      />
    </div>
  );
}
