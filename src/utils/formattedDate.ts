import { useAppSelector } from '../store/store';

export const formattedDate = (dateTask: string): string => {
  const date = new Date(dateTask);

  const formatingDate = date.toLocaleDateString('ru-RU');
  return formatingDate;
};
