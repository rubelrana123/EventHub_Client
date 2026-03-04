import MyTicketsTable from "@/components/modules/Participator/MyTicketsTable";
import { getParticipatorDashboardData } from "@/services/participator/dashboard.service";

export default async function MyTicketPage() {
  const dashboardData = await getParticipatorDashboardData();

  return <MyTicketsTable tickets={dashboardData.allEvents} />;
}
