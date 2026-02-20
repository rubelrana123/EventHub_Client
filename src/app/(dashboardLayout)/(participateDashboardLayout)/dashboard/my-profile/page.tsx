import DashboardStatsGrid from "@/components/modules/ParticipatorDashboard/DashboardStatsGrid";
import ParticipatorDataGraphs from "@/components/modules/ParticipatorDashboard/ParticipatorDataGraphs";
import ProfileSummaryCard from "@/components/modules/ParticipatorDashboard/ProfileSummaryCard";
import { formatDashboardCurrency } from "@/lib/participator-dashboard.utils";
import { getParticipatorDashboardData } from "@/services/participator/dashboard.service";

export default async function MyProfilePage() {
  const dashboardData = await getParticipatorDashboardData();
  const { profile, summary } = dashboardData;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-white p-5">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="mt-1 text-sm text-slate-600">
          Review your profile summary and participation metrics.
        </p>
      </div>

      <DashboardStatsGrid
        stats={[
          { title: "Total Joined", value: summary.totalJoined },
          { title: "Paid Events", value: summary.paidEvents },
          { title: "Active Events", value: summary.activeEvents },
          { title: "Total Spent", value: formatDashboardCurrency(summary.totalSpent) },
        ]}
      />

      <ParticipatorDataGraphs
        title="Profile Analytics Graphs"
        subtitle="Graph-based view of your participation and payment behavior."
        events={dashboardData.allEvents}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileSummaryCard profile={profile} />
      </div>
    </section>
  );
}
