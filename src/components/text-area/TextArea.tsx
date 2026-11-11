interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  nameArea?: string;
  className?: string;
  error?: boolean;
}

export default function TextArea({
  nameArea = '',
  className = '',
  error = false,
  ...props
}: TextAreaProps) {
  return (
    <>
      <textarea
        name={nameArea}
        id=""
        className={`${className} placeholder-gray-400 
           p-2 placeholder-font-normal placeholder-text-[14px] outline-none ${error ? 'border-[rgba(219,0,48,1)]' : ''} `}
        {...props}
      />
    </>
  );
}
