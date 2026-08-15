import Image from 'next/image';
import Bar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

export default function Home() {
  return (
    <div className="flex flex-col px-6 pt-2.25 ">
      <Topbar />
      <div className="flex flex-col items-center gap-6 text-center p-6 sm:items-center sm:text-left">
        <h1 className="max-w-xs text-3xl leading-10 tracking-tight text-black dark:text-zinc-50">
          CONTENT
        </h1>
      </div>
    </div>
  );
}
