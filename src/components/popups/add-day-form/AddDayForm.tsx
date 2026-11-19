'use client';

import { useAppDispatch, useAppSelector } from '@/src/store/store';
import Button from '../../added-btn/AddedBtn';
import {
  setIsShowMessage,
  setMessage,
  setOpenAddFormDay,
  setToday,
} from '@/src/store/features/taskSlice';
import MessageForm from '../message-form/MessageForm';
import { useEffect, useState } from 'react';
import { DaysType } from '@/src/shared-types/sharedTypes';

export default function AddDayForm() {
  const dispatch = useAppDispatch();
  const { days, message, isShowMessage } = useAppSelector(
    (state) => state.tasks,
  );

  const isToday = days.map((day) => day._idDay)[0];
  console.log('isToday: ', isToday);

  const onAddedDay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setToday(isToday));
    dispatch(setOpenAddFormDay(false));
    dispatch(setIsShowMessage(true));
    dispatch(setMessage('Новый день добавлен успешно'));
  };

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-92.75 min-h-130 p-5 z-50 popup-form-task shadow-[0px_4px_67px_-12px_rgba(0,0,0,1)]"
      >
        <h6 className="text-center text-[18px] font-light ">
          Добавление нового дня
        </h6>
        <div className="min-h-120"></div>

        <div className="flex items-end justify-center">
          <Button
            onClick={onAddedDay}
            className="font-light hover:scale-101 hover:shadow-[0px_4px_67px_-12px_rgba(0,0,0,1)]"
          >
            Добавить день
          </Button>
        </div>
      </div>
      {isShowMessage && <MessageForm message={message} />}
    </div>
  );
}
