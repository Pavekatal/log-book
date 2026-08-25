interface DateInputProps extends React.ChangeEvent<
  HTMLInputElement,
  HTMLInputElement
> {
  className?: string;
  error?: false;
}

export default function DateInput({ className = '', error = false, ...props }) {
  return (
    <>
      <input
        type="date"
        className={`${className} w-90 h-9.5 placeholder-gray-400 
           p-2 placeholder-font-normal placeholder-text-[14px] outline-none `}
        {...props}
      />
    </>
  );
}
