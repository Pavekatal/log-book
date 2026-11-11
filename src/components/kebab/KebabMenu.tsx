export interface KebabMenuProps {
  className?: string;
}

export default function KebabMenu({
  className = '',
  ...props
}: KebabMenuProps) {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center gap-0.5 cursor-pointer `}
      {...props}
    >
      <div className="w-1.25 h-1.25 bg-white rounded-[5px]"></div>
      <div className="w-1.25 h-1.25 bg-white rounded-[5px]"></div>
      <div className="w-1.25 h-1.25 bg-white rounded-[5px]"></div>
    </div>
  );
}
