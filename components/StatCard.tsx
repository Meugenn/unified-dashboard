function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="card card-hover" style={{ padding: "20px 24px" }}>
      <div className="label-mono" style={{ marginBottom: 12 }}>
        {label}
      </div>
      <div className="stat-value" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

export default StatCard;