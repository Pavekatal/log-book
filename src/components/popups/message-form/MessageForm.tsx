'use client';

import { useAppDispatch, useAppSelector } from '@/src/store/store';
import Button from '../../added-btn/AddedBtn';
import { setIsShowMessage } from '@/src/store/features/taskSlice';

type MessageFormType = {
  message: string;
};

export default function MessageForm({ message }: MessageFormType) {
  const dispatch = useAppDispatch();

  const onCloseMessageForm = () => {
    dispatch(setIsShowMessage(false));
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        aria-hidden="true"
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-[0px_4px_67px_-12px_rgba(0,0,0,1)] w-98.25 h-auto border-white/10 rounded-[8px] backdrop-blur-[25px] bg-white/15 p-5 flex flex-col gap-4 items-center ">
        <p className="text-center">{message}</p>
        <Button
          onClick={onCloseMessageForm}
          className="w-28 h-auto py-2 shadow-[0px_4px_67px_-12px_rgba(0,0,0,1)] hover:scale-105 cursor-pointer  "
        >
          Понятно
        </Button>
      </div>
    </div>
  );
}
