function PageHeader({
  title,
  description,
  actions,
  backLink,
}) {
  return (
    <div className="ogr-page-header">
      <div className="min-w-0">
        {backLink && (
          <div className="mb-3">
            {backLink}
          </div>
        )}

        <h1 className="ogr-page-title">
          {title}
        </h1>

        {description && (
          <p className="ogr-page-description">
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
  );
}

export default PageHeader;
