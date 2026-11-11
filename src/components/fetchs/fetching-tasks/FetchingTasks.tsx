'use client';

import { getTasks } from '@/src/services/tasks/tasksAPI';
import { setErrorMessage, setTasks } from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingTasks() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(setErrorMessage(''));

    if (!tasks.length) {
      // загрузка все задач
      getTasks()
        .then((res) => {
          dispatch(setTasks(res));
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
  }, [dispatch, tasks]);
  return <></>;
}
