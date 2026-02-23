import Link from "next/link";
import DashboardStatsGrid from "@/components/modules/ParticipatorDashboard/DashboardStatsGrid";
import DashboardVisualGraphs from "@/components/modules/Dashboard/DashboardVisualGraphs";
import ParticipatorDataGraphs from "@/components/modules/ParticipatorDashboard/ParticipatorDataGraphs";
import { formatDashboardCurrency } from "@/lib/participator-dashboard.utils";
import { getParticipatorDashboardData } from "@/services/participator/dashboard.service";

export default async function ParticipatorDashboardPage() {
  const dashboardData = await getParticipatorDashboardData();
  const { profile, summary } = dashboardData;

  return (
    <section className="space-y-6 pb-4">
      <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-slate-900 via-cyan-900 to-emerald-800 p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-cyan-100">Participant Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Welcome, {profile.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50/90">
          Manage your joined events, track your activity, and keep your profile updated.
        </p>
      </div>

      <DashboardStatsGrid
        stats={[
          { title: "Total Joined", value: summary.totalJoined },
          { title: "Active Events", value: summary.activeEvents },
          { title: "Completed Events", value: summary.completedEvents },
          {
            title: "Total Spent",
            value: formatDashboardCurrency(summary.totalSpent),
            helper: `${summary.paidEvents} paid events`,
          },
        ]}
      />

      <DashboardVisualGraphs
        title="Participation Trend"
        description="Quick visual breakdown of your event activity."
        bars={[
          { label: "Active", value: summary.activeEvents, colorClass: "bg-cyan-500" },
          { label: "Completed", value: summary.completedEvents, colorClass: "bg-emerald-500" },
          { label: "Paid", value: summary.paidEvents, colorClass: "bg-amber-500" },
        ]}
        donutLabel="Payment Completion"
        donutValue={summary.paidEvents}
        donutTotal={summary.totalJoined}
        summaries={[{ label: "Total Spent", value: formatDashboardCurrency(summary.totalSpent) }]}
      />

      <ParticipatorDataGraphs
        title="Detailed Participation Graphs"
        subtitle="Status, monthly join activity, and payment mix."
        events={dashboardData.allEvents}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/dashboard/my-events"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
        >
          <h2 className="text-base font-semibold text-slate-800">My Joined Events</h2>
          <p className="mt-1 text-sm text-slate-600">
            View events you have already joined.
          </p>
        </Link>

        <Link
          href="/dashboard/my-history"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
        >
          <h2 className="text-base font-semibold text-slate-800">My History</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review your past event participation activity.
          </p>
        </Link>

        <Link
          href="/my-profile"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
        >
          <h2 className="text-base font-semibold text-slate-800">My Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            Edit your profile and account details.
          </p>
        </Link>
      </div>
    </section>
  );
}
