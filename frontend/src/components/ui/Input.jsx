function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  helpText = "",
  className = "",
  ...props
}) {
  const inputStyles = `
    w-full
    rounded-ogr-md
    border
    bg-white
    px-3
    py-2.5
    text-sm
    text-ogr-slate-900
    shadow-ogr-sm
    outline-none
    transition-colors
    placeholder:text-ogr-slate-400
    focus:border-ogr-primary-500
    focus:ring-2
    focus:ring-ogr-primary-500/20
    disabled:cursor-not-allowed
    disabled:bg-ogr-slate-100
    disabled:text-ogr-slate-500
  `;

  const borderStyle = error
    ? "border-ogr-danger focus:border-ogr-danger focus:ring-red-500/20"
    : "border-ogr-slate-300";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-ogr-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-ogr-danger">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${inputStyles} ${borderStyle}`}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-sm text-ogr-danger">
          {error}
        </p>
      )}

      {!error && helpText && (
        <p className="mt-1.5 text-sm text-ogr-slate-500">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default Input;
