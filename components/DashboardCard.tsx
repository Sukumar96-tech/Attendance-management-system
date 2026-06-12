interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}