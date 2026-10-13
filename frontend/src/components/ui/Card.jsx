function Card({
  title,
  description,
  children,
  actions,
  footer,
  className = "",
  bodyClassName = "",
  hover = false,
  padding = true,
}) {
  return (
    <section
      className={[
        "overflow-hidden rounded-ogr-xl border border-ogr-slate-200 bg-white shadow-ogr-sm",
        "transition duration-200",
        hover
          ? "hover:-translate-y-0.5 hover:border-ogr-slate-300 hover:shadow-ogr-md"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Header */}
      {(title || description || actions) && (
        <div className="flex flex-col gap-4 border-b border-ogr-slate-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div className="min-w-0">
            {title && (
              <h3 className="text-base font-semibold tracking-tight text-ogr-slate-900">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm leading-5 text-ogr-slate-500">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex shrink-0 items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className={[
          padding ? "p-5 sm:p-6" : "",
          bodyClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>

      {/* Optional Footer */}
      {footer && (
        <div className="border-t border-ogr-slate-100 bg-ogr-slate-50/50 px-5 py-4 sm:px-6">
          {footer}
        </div>
      )}
    </section>
  );
}

export default Card;