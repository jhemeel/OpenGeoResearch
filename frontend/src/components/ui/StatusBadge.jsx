function StatusBadge({ status }) {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  const statusVariants = {
    active: "ogr-badge-success",
    completed: "ogr-badge-success",
    approved: "ogr-badge-success",
    draft: "ogr-badge-neutral",
    pending: "ogr-badge-warning",
    inactive: "ogr-badge-neutral",
    archived: "ogr-badge-neutral",
    cancelled: "ogr-badge-danger",
    rejected: "ogr-badge-danger",
    "in-progress": "ogr-badge-primary",
    published: "ogr-badge-geo",
  };

  const badgeClass = statusVariants[normalizedStatus] || "ogr-badge-neutral";

  const displayStatus = String(status || "Unknown").replace(/[_-]+/g, " ");

  return <span className={`ogr-badge ${badgeClass}`}>{displayStatus}</span>;
}

export default StatusBadge;
