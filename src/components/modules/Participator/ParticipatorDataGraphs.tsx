import { formatDashboardCurrency, isPaidPaymentStatus } from "@/lib/participator-dashboard.utils";
import { ParticipatorDashboardEvent } from "@/types/participator-dashboard";

interface ParticipatorDataGraphsProps {
  title?: string;
  subtitle?: string;
  events: ParticipatorDashboardEvent[];
}

const EVENT_STATUSES = ["UPCOMING", "LIVE", "COMPLETED", "REGISTRATION_CLOSED"] as const;

const getMonthKey = (dateString: string) => {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const getMonthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short" });
};

const ParticipatorDataGraphs = ({
  title = "Data Visual Overview",
  subtitle = "Most key participation metrics represented visually.",
  events,
}: ParticipatorDataGraphsProps) => {
  const statusCounts = EVENT_STATUSES.map((status) => ({
    status,
    count: events.filter((event) => (event.eventStatus || "").toUpperCase() === status).length,
  }));

  const maxStatusCount = Math.max(1, ...statusCounts.map((item) => item.count));

  const paidEvents = events.filter((event) => isPaidPaymentStatus(event.paymentStatus));
  const unpaidEvents = events.length - paidEvents.length;

  const paidAmount = paidEvents.reduce((sum, event) => sum + (event.amount || 0), 0);
  const unpaidAmount = events
    .filter((event) => !isPaidPaymentStatus(event.paymentStatus))
    .reduce((sum, event) => sum + (event.amount || 0), 0);

  const paidPercent = events.length ? (paidEvents.length / events.length) * 100 : 0;

  const monthlyMap = new Map<string, number>();
  events.forEach((event) => {
    const key = getMonthKey(event.joinedAt || event.eventDateTime);
    if (!key) return;
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
  });

  const monthKeys = Array.from(monthlyMap.keys()).sort().slice(-6);
  const monthlyBars = monthKeys.map((key) => ({
    month: getMonthLabel(key),
    count: monthlyMap.get(key) || 0,
  }));
  const maxMonthCount = Math.max(1, ...monthlyBars.map((item) => item.count), 1);

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-white p-4">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Status Distribution</h3>
          <div className="mt-4 space-y-3">
            {statusCounts.map((item) => (
              <div key={item.status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">{item.status}</span>
                  <span className="text-slate-500">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    style={{ width: `${Math.max((item.count / maxStatusCount) * 100, item.count ? 10 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Join Activity (Last 6 Months)</h3>
          <div className="mt-5 grid grid-cols-6 items-end gap-2">
            {(monthlyBars.length ? monthlyBars : [{ month: "N/A", count: 0 }]).map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div className="flex h-28 w-8 items-end rounded bg-slate-100 p-1">
                  <div
                    className="w-full rounded bg-cyan-500"
                    style={{
                      height: `${Math.max((item.count / maxMonthCount) * 100, item.count ? 8 : 0)}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] font-medium text-slate-500">{item.month}</p>
                <p className="text-xs font-semibold text-slate-700">{item.count}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Payment Mix</h3>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div
              className="relative h-28 w-28 rounded-full"
              style={{
                background: `conic-gradient(#f59e0b ${paidPercent}%, #e2e8f0 ${paidPercent}% 100%)`,
              }}
            >
              <div className="absolute inset-3 grid place-items-center rounded-full bg-white">
                <p className="text-lg font-bold text-slate-800">{Math.round(paidPercent)}%</p>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs">
              <p className="flex items-center justify-between text-slate-600">
                <span>Paid Events</span>
                <span className="font-semibold text-slate-800">{paidEvents.length}</span>
              </p>
              <p className="flex items-center justify-between text-slate-600">
                <span>Unpaid Events</span>
                <span className="font-semibold text-slate-800">{unpaidEvents}</span>
              </p>
              <p className="flex items-center justify-between text-slate-600">
                <span>Paid Amount</span>
                <span className="font-semibold text-slate-800">{formatDashboardCurrency(paidAmount)}</span>
              </p>
              <p className="flex items-center justify-between text-slate-600">
                <span>Unpaid Amount</span>
                <span className="font-semibold text-slate-800">
                  {formatDashboardCurrency(unpaidAmount)}
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ParticipatorDataGraphs;
