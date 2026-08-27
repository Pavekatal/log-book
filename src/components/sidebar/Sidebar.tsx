import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <div className="min-w-60 min-h-full border-r border-white rounded-tl-0 rounded-tr-[20px] rounded-br-[20px] rounded-bl-0 backdrop-filter backdrop-blur-[10px] bg-white/10 flex flex-col items-start justify-between ">
        <Link href={'/log-book/main'}>
          <div className="min-w-60 h-17.5 border-b border-white/20 text-[24px] leading-6 font-light  text-white flex items-center justify-center cursor-pointer ">
            LOG BOOK
          </div>
        </Link>
        <div className="px-6 font-light text-[16px] leading-4.75 ">
          <Link href={'/log-book/tasks'}>
            <div className="w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/tasks.svg'}
                alt="tasks"
                className="shrink-0 "
              />
              <p>Задачи на день</p>
            </div>
          </Link>
          <Link href={'/log-book/calls'}>
            <div className=" w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/messages.svg'}
                alt="calls"
                className="shrink-0 "
              />
              <p>Звонки и задачи</p>
            </div>
          </Link>
          <Link href={'/log-book/esroo'}>
            <div className=" w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/lamp-charge.svg'}
                alt="esroo"
                className="shrink-0 "
              />
              <p>ЕСРОО</p>
            </div>
          </Link>
          <Link href={'/log-book/vitrina-egrn'}>
            <div className="w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/layer.svg'}
                alt="vitrina egrn"
                className="shrink-0 "
              />
              <p>Витрина ЕГРН</p>
            </div>
          </Link>
          <Link href={'/log-book/gis-zhkh'}>
            <div className="w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/exports.svg'}
                alt="gis zhkh"
                className="shrink-0 "
              />
              <p>ГИС ЖКХ</p>
            </div>
          </Link>
          <Link href={'/log-book/nsud'}>
            <div className="w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/copy-success.svg'}
                alt="nsud"
                className="shrink-0 "
              />
              <p>Сверка НСУД - ЕГРН</p>
            </div>
          </Link>
          <Link href={'/log-book/reports'}>
            <div className="w-48 h-10.75 px-2 py-3 flex items-center gap-3 bg-glass-hover">
              <Image
                width={24}
                height={24}
                src={'/img/reports.svg'}
                alt="reports"
                className="shrink-0 "
              />
              <p>Отчеты</p>
            </div>
          </Link>
        </div>
        <div className="min-w-60 h-17.5 px-6 border-t border-white/20 flex items-center gap-3 cursor-pointer ">
          <Image
            width={15}
            height={17}
            src={'/img/settings.png'}
            alt="settings"
          />
          <p className="text-[14px] leading-3.5 text-white font-light flex items-center justify-center">
            Settings
          </p>
        </div>
      </div>
    </>
  );
}
