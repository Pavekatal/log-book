'use client';

import { useEffect, useState } from 'react';

export default function DataTime() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !now) {
    return <span></span>;
  }

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const userDate = now.toLocaleDateString('ru-RU', optionsDate);

  const userTime = now.toLocaleTimeString('ru-RU', optionsTime);

  return (
    <span className="w-113 h-9.5 px-4.5 py-2.25 border border-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-white/10 text-[rgba(255, 255, 255, 0.1)] font-light bg-input-glass flex ">{`${userDate}  ${userTime}`}</span>
  );
}
