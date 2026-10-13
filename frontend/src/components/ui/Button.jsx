function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-ogr-primary-600 text-white hover:bg-ogr-primary-700 focus:ring-ogr-primary-500",

    secondary:
      "bg-ogr-geo-600 text-white hover:bg-ogr-geo-700 focus:ring-ogr-geo-500",

    outline:
      "border border-ogr-slate-300 bg-white text-ogr-slate-700 hover:bg-ogr-slate-50 focus:ring-ogr-primary-500",

    ghost:
      "bg-transparent text-ogr-slate-700 hover:bg-ogr-slate-100 focus:ring-ogr-primary-500",

    danger:
      "bg-ogr-danger text-white hover:bg-red-700 focus:ring-red-500",

    warning:
      "bg-ogr-warning text-white hover:bg-amber-700 focus:ring-amber-500",
  };

  const sizes = {
    sm: "h-8 rounded-ogr-sm px-3 text-sm",

    md: "h-10 rounded-ogr-md px-4 text-sm",

    lg: "h-12 rounded-ogr-lg px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;