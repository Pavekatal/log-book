interface ToggleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  checked: boolean | undefined;
}

export default function ToggleInputSquare({
  className = '',
  checked,
  ...props
}: ToggleInputProps) {
  return (
    <>
      <input
        type="checkbox"
        role="switch"
        name="checkbox"
        className={`toggle-square ${className}`}
        checked={checked}
        {...props}
      />
    </>
  );
}
