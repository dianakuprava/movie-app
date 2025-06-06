import './MovieRating.css';

export default function MovieRating({ rating = 0 }) {
  const getRatingColor = (value) => {
    if (value < 3) return '#E90000';
    if (value < 5) return '#E97E00';
    if (value < 7) return '#E9D100';
    return '#66E900';
  };

  const displayRating = typeof rating === 'number' ? rating : 0;

  return (
    <div
      className="movie-rating-circle"
      style={{
        borderColor: getRatingColor(displayRating),
      }}
    >
      {displayRating.toFixed(1)}
    </div>
  );
}
