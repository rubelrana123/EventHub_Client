import ParticipatorEventsTable from "@/components/modules/ParticipatorDashboard/ParticipatorEventsTable";
import ParticipatorDataGraphs from "@/components/modules/ParticipatorDashboard/ParticipatorDataGraphs";
import { getParticipatorDashboardData } from "@/services/participator/dashboard.service";

export default async function MyHistoryPage() {
  const dashboardData = await getParticipatorDashboardData();

  const historyList =
    dashboardData.historyEvents.length > 0
      ? dashboardData.historyEvents
      : dashboardData.allEvents;

  return (
    <section className="space-y-6">
      <ParticipatorDataGraphs
        title="History Graph View"
        subtitle="Visual summary of your participation history."
        events={historyList}
      />
      <ParticipatorEventsTable
        title="My History"
        description="Previous participations and payment records."
        events={historyList}
        emptyMessage="No participation history found."
      />
    </section>
  );
}
