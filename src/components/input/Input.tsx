interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

export default function Input({ className = '', error = false, ...props }) {
  return (
    <>
      <input
        type="text"
        className={`placeholder-gray-400 
           p-2 placeholder-font-normal placeholder-text-[14px] ${className} outline-none ${error ? 'border-[rgba(219,0,48,1)]' : ''} `}
        {...props}
      />
    </>
  );
}
