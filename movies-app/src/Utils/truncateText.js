export const truncateText = (text, maxLength = 150) => {
  if (typeof text !== 'string' || !text) return '';
  if (text.length <= maxLength) return text;

  // Обрезаем до maxLength (включая место для "...")
  const truncated = text.slice(0, maxLength - 3);

  // Находим последний пробел, чтобы не разорвать слово
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // Возвращаем результат
  return lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
};