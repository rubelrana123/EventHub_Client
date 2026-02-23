import ParticipatorEventsTable from "@/components/modules/ParticipatorDashboard/ParticipatorEventsTable";
import ParticipatorDataGraphs from "@/components/modules/ParticipatorDashboard/ParticipatorDataGraphs";
import { getParticipatorDashboardData } from "@/services/participator/dashboard.service";

export default async function MyEventPage() {
  const dashboardData = await getParticipatorDashboardData();

  return (
    <section className="space-y-6">
      <ParticipatorDataGraphs
        title="Active Events Graph View"
        subtitle="Visual summary for your active joined events."
        events={dashboardData.activeEventsList}
      />
      <ParticipatorEventsTable
        title="My Joined Events"
        description="All active events you joined and their payment status."
        events={dashboardData.activeEventsList}
        emptyMessage="No active joined events found."
      />
    </section>
  );
}
