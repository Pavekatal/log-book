interface ToggleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function ToggleInput({
  className = '',
  ...props
}: ToggleInputProps) {
  return (
    <>
      <input
        type="checkbox"
        role="switch"
        name="checkbox"
        className="toggle"
        {...props}
      />
    </>
  );
}
