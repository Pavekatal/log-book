'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import DataTime from '../data-time/DataTime';

export default function Topbar() {
  const pathname = usePathname();
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

  return (
    <div className="w-auto h-15 px-6 mx-6 my-2.25 py-2.25 flex items-center justify-between gap-6 bg-card-glass ">
      <div className="flex items-center gap-3">
        <Image width={42} height={26} src={`${currentLogo}`} alt="tasks" />
        <h1 className="max-w-xs text-3xl leading-10 font-light ">{`${currentPage}`}</h1>
      </div>
      <DataTime />
    </div>
  );
}
