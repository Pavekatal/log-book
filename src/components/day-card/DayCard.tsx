interface DayCardType {
  className?: string;
}

export default function DayCard({ className = '', ...props }) {
  let dateTask: string = '25.09.2026';
  return (
    <div
      className={` ${className} w-28 h-12 m-2 p-3 border border-white rounded-[10px] backdrop-filter backdrop-blur-[5px] bg-white/10 cursor-pointer font-extralight `}
      {...props}
    >
      {dateTask}
    </div>
  );
}
