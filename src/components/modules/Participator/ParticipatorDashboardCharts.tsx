import { formatDashboardCurrency } from "@/lib/participator-dashboard.utils";

interface ParticipatorDashboardChartsProps {
  totalJoined: number;
  activeEvents: number;
  completedEvents: number;
  paidEvents: number;
  totalSpent: number;
}

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const ParticipatorDashboardCharts = ({
  totalJoined,
  activeEvents,
  completedEvents,
  paidEvents,
  totalSpent,
}: ParticipatorDashboardChartsProps) => {
  const activityItems = [
    { label: "Active", value: activeEvents, colorClass: "bg-cyan-500" },
    { label: "Completed", value: completedEvents, colorClass: "bg-emerald-500" },
    { label: "Paid", value: paidEvents, colorClass: "bg-amber-500" },
  ];

  const activityMax = Math.max(1, ...activityItems.map((item) => item.value));
  const paidPercent = totalJoined > 0 ? clampPercent((paidEvents / totalJoined) * 100) : 0;

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
        <h3 className="text-base font-semibold text-slate-800">Participation Trend</h3>
        <p className="mt-1 text-xs text-slate-500">
          Quick visual breakdown of your event activity.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {activityItems.map((item) => {
            const heightPercent = clampPercent((item.value / activityMax) * 100);
            return (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="flex h-44 w-full max-w-[80px] items-end rounded-md bg-slate-100 p-2">
                  <div
                    className={`w-full rounded-sm ${item.colorClass}`}
                    style={{ height: `${Math.max(heightPercent, item.value > 0 ? 8 : 0)}%` }}
                  />
                </div>
                <p className="text-xs font-medium text-slate-600">{item.label}</p>
                <p className="text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            );
          })}
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <h3 className="text-base font-semibold text-slate-800">Payment Completion</h3>
        <p className="mt-1 text-xs text-slate-500">Paid events against all joined events.</p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            className="relative h-36 w-36 rounded-full"
            style={{
              background: `conic-gradient(#f59e0b ${paidPercent}%, #e2e8f0 ${paidPercent}% 100%)`,
            }}
          >
            <div className="absolute inset-4 grid place-items-center rounded-full bg-white">
              <p className="text-2xl font-bold text-slate-800">{Math.round(paidPercent)}%</p>
            </div>
          </div>

          <div className="w-full space-y-2 text-sm">
            <p className="flex items-center justify-between text-slate-600">
              <span>Total Joined</span>
              <span className="font-semibold text-slate-800">{totalJoined}</span>
            </p>
            <p className="flex items-center justify-between text-slate-600">
              <span>Paid Events</span>
              <span className="font-semibold text-slate-800">{paidEvents}</span>
            </p>
            <p className="flex items-center justify-between text-slate-600">
              <span>Total Spent</span>
              <span className="font-semibold text-slate-800">
                {formatDashboardCurrency(totalSpent)}
              </span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ParticipatorDashboardCharts;
