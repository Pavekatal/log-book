'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import DataTime from '../data-time/DataTime';
import { useAppSelector } from '@/src/store/store';
import Button from '../added-btn/AddedBtn';

export default function Topbar() {
  const pathname = usePathname();
  const { currentUser } = useAppSelector((state) => state.tasks);

  let currentPage: string = '';

  let currentLogo: string = '';

  if (pathname.startsWith('/log-book/task')) {
    currentPage = 'Задачи';
    currentLogo = '/img/tasks.svg';
  } else if (pathname.startsWith('/log-book/calls')) {
    currentPage = 'Консультации';
    currentLogo = '/img/logs.svg';
  } else if (pathname.startsWith('/log-book/esroo')) {
    currentPage = 'ЕСРОО';
    currentLogo = '/img/logs.svg';
  } else if (pathname.startsWith('/log-book/gis-zhkh')) {
    currentPage = 'ГИС ЖКХ';
    currentLogo = '/img/exports.svg';
  } else if (pathname.startsWith('/log-book/nsud')) {
    currentPage = 'НСУД';
    currentLogo = '/img/exports.svg';
  } else if (pathname.startsWith('/log-book/reports')) {
    currentPage = 'Отчеты';
    currentLogo = '/img/reports.svg';
  } else if (pathname.startsWith('/log-book/vitrina-egrn')) {
    currentPage = 'Витрина ЕГРН';
    currentLogo = '/img/exports.svg';
  } else if (pathname.startsWith('/log-book/main')) {
    currentPage = ' ';
    currentLogo = '/img/logo.svg';
  }

  const onAddedDay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Добавлен Новый день');
  };

  return (
    <div className="w-auto h-15 px-6 mx-6 my-2.25 py-2.25 flex items-center justify-between gap-6 bg-card-glass ">
      <div className="flex items-center gap-3">
        <Image width={42} height={26} src={`${currentLogo}`} alt="tasks" />
        <h1 className="max-w-xs text-3xl leading-10 font-light ">{`${currentPage}`}</h1>
      </div>
      <Button
        className="w-40 h-9.5 text-[18px] font-light border border-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-white/10 text-white bg-input-glass "
        onClick={onAddedDay}
      >
        Новый день
      </Button>
      <DataTime />
      <span className="w-auto h-9.5 px-4.5 py-1 border border-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-white/10 text-white text-[12px] font-light bg-input-glass flex items-center justify-center cursor-pointer ">{`${currentUser}`}</span>
    </div>
  );
}
