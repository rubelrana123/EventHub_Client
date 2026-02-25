import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  title: string;
  value: string | number;
  helper?: string;
}

interface DashboardStatsGridProps {
  stats: StatItem[];
}

const DashboardStatsGrid = ({ stats }: DashboardStatsGridProps) => {
  const accentClasses = [
    "border-t-cyan-500",
    "border-t-emerald-500",
    "border-t-amber-500",
    "border-t-slate-500",
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card
          key={stat.title}
          className={`border border-slate-200/80 bg-white/90 shadow-sm ${accentClasses[idx % accentClasses.length]} border-t-4`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            {stat.helper ? (
              <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default DashboardStatsGrid;
