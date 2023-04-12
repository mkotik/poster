type TextFieldProps = {
  error?: string;
  className?: string;
  label?: string;
  [key: string]: any;
};

const TextField: React.FC<TextFieldProps> = ({
  error,
  className,
  label,
  ...props
}) => {
  return (
    <label className={className}>
      {/* Contact Information */}
      {label}
      <input {...props} className={error ? "border-red-500" : ""} />
      {error && (
        <p className="absolute bottom-0 pl-1 text-xs text-red-500 pl-[1px]">
          {error}
        </p>
      )}
    </label>
  );
};

export default TextField;
