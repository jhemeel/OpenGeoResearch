function FormField({
  label,
  htmlFor,
  required = false,
  error = "",
  helpText = "",
  children,
}) {
  return (
    <div className="form-field">
      {label && (
        <label
          htmlFor={htmlFor}
          className="form-label"
        >
          {label}

          {required && (
            <span className="form-required">
              {" "}*
            </span>
          )}
        </label>
      )}

      {children}

      {helpText && !error && (
        <p className="form-help">
          {helpText}
        </p>
      )}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;