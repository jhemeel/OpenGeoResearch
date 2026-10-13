function Checkbox({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  description = "",
}) {
  return (
    <div className="checkbox-wrapper">
      <label className="checkbox-label">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
        />

        <span className="checkbox-text">
          {label}
        </span>
      </label>

      {description && (
        <p className="checkbox-description">
          {description}
        </p>
      )}
    </div>
  );
}

export default Checkbox;