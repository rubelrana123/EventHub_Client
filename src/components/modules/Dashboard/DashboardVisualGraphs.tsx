interface GraphBarItem {
  label: string;
  value: number;
  colorClass: string;
}

interface GraphSummaryItem {
  label: string;
  value: string | number;
}

interface DashboardVisualGraphsProps {
  title?: string;
  description?: string;
  bars: GraphBarItem[];
  donutLabel: string;
  donutValue: number;
  donutTotal: number;
  summaries?: GraphSummaryItem[];
}

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const DashboardVisualGraphs = ({
  title = "Visual Overview",
  description = "Quick activity and completion visualization.",
  bars,
  donutLabel,
  donutValue,
  donutTotal,
  summaries = [],
}: DashboardVisualGraphsProps) => {
  const maxBar = Math.max(1, ...bars.map((item) => item.value));
  const donutPercent = donutTotal > 0 ? clampPercent((donutValue / donutTotal) * 100) : 0;

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {bars.map((item) => {
            const heightPercent = clampPercent((item.value / maxBar) * 100);

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
        <h3 className="text-base font-semibold text-slate-800">{donutLabel}</h3>
        <p className="mt-1 text-xs text-slate-500">Completion and ratio indicator.</p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            className="relative h-36 w-36 rounded-full"
            style={{
              background: `conic-gradient(#f59e0b ${donutPercent}%, #e2e8f0 ${donutPercent}% 100%)`,
            }}
          >
            <div className="absolute inset-4 grid place-items-center rounded-full bg-white">
              <p className="text-2xl font-bold text-slate-800">{Math.round(donutPercent)}%</p>
            </div>
          </div>

          <div className="w-full space-y-2 text-sm">
            <p className="flex items-center justify-between text-slate-600">
              <span>Value</span>
              <span className="font-semibold text-slate-800">{donutValue}</span>
            </p>
            <p className="flex items-center justify-between text-slate-600">
              <span>Total</span>
              <span className="font-semibold text-slate-800">{donutTotal}</span>
            </p>
            {summaries.map((item) => (
              <p
                key={item.label}
                className="flex items-center justify-between text-slate-600"
              >
                <span>{item.label}</span>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default DashboardVisualGraphs;
