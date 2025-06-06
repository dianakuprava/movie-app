import { Rate, message } from 'antd';
import { useState, useEffect } from 'react';
import { rateMovie } from '../../API/movieDb.js';
import './MovieRateStars.css';

export default function MovieRateStars({ movieId, sessionId, initialRating = 0, onRatingUpdate }) {
  const [rating, setRating] = useState(initialRating);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRate = async (value) => {
    try {
      setIsLoading(true);
      await rateMovie(movieId, value, sessionId);
      setRating(value);
      if (onRatingUpdate) onRatingUpdate(movieId, value);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stars-container">
      <Rate
        value={rating}
        onChange={handleRate}
        count={10}
        allowHalf
        disabled={isLoading || !sessionId}
      />
    </div>
  );
}
