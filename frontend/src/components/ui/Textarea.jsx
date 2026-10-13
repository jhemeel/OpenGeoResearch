function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  disabled = false,
  error = "",
  className = "",
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}

          {required && (
            <span className="form-required"> *</span>
          )}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`form-textarea ${
          error ? "form-textarea-error" : ""
        }`}
      />

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Textarea;