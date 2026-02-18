import HostEventsFilter from "@/components/modules/Host/EventsManagement/EventsFilter";
import HostEventsManagementHeader from "@/components/modules/Host/EventsManagement/EventsManagementHeader";
import HostEventsTable from "@/components/modules/Host/EventsManagement/EventsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getEvents } from "@/services/admin/eventsManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";

const HostEventsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [searchParamsObj, userInfo] = await Promise.all([
    searchParams,
    getUserInfo(),
  ]);

  const params = new URLSearchParams(queryStringFormatter(searchParamsObj));
  if (userInfo?.email) {
    params.set("createdByEmail", userInfo.email);
  }

  const eventsResult = await getEvents(params.toString());
  const totalPages = Math.ceil(
    (eventsResult?.meta?.total || 1) / (eventsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <HostEventsManagementHeader />
      <HostEventsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <HostEventsTable events={eventsResult?.data || []} />
        <TablePagination
          currentPage={eventsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default HostEventsManagementPage;
