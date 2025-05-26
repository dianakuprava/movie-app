import { format, parseISO } from 'date-fns';

export const formatMovieDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch {
    return dateString; // Возвращаем исходную строку в случае ошибки
  }
};