import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${className} w-21.75 h-7.75 px-3 py-2 rounded-[17px] outline-none border-none backdrop-filter backdrop-blur-[10px] bg-white/10 cursor-pointer `}
      {...props}
    >
      {children}
    </button>
  );
}
