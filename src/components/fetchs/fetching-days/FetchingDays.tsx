'use client';

import { getDays } from '@/src/services/days/daysAPI';
import {
  setDays,
  setErrorMessage,
  setToday,
} from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingDays() {
  const dispatch = useAppDispatch();
  const { days } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (!days.length) {
      getDays()
        .then((res) => {
          dispatch(setDays(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            dispatch(setErrorMessage(error.response?.data));
          } else if (error.request) {
            dispatch(setErrorMessage('Похоже, что-то с интернетом'));
          } else {
            dispatch(setErrorMessage('Неизвестная ошибка'));
          }
        });
    }
  }, [dispatch, days]);
  return <></>;
}
