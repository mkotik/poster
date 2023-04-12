type SelectFieldProps = {
  error?: string;
  className?: string;
  label?: string;
  options: { value: string; key: string; text: string; [key: string]: any }[];
  [key: string]: any;
};

const SelectField: React.FC<SelectFieldProps> = ({
  error,
  className,
  label,
  options,
  ...props
}) => {
  return (
    <label className={className}>
      {label}
      <select className={`${error ? "border-red-500" : ""} flex-1`} {...props}>
        {options.map((option) => {
          const { value, key, text, ...rest } = option;
          return (
            <option value={value} key={key} {...rest}>
              {text}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="absolute bottom-0 text-xs text-red-500">{error}</p>
      )}
    </label>
  );
};

export default SelectField;
