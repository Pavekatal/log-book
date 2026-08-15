import DataTime from '../data-time/DataTime';

export default function Topbar() {
  return (
    <div className="w-full h-15 px-6 py-2.25 flex items-center justify-center bg-card-glass ">
      <DataTime />
    </div>
  );
}
