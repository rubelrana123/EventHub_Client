 
import EventsTable from "@/components/modules/Admin/EventsManagement/EventsTable";
import EventsFilter from "@/components/modules/Admin/EventsManagement/EventsFilter";
import EventsManagementHeader from "@/components/modules/Admin/EventsManagement/EventsManagementHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getEvents } from "@/services/admin/eventsManagement";
 
import { Suspense } from "react";

const  EventsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const eventsResult = await getEvents(queryString);

  const totalPages = Math.ceil(
    (eventsResult?.meta?.total || 1) / (eventsResult?.meta?.limit || 1)
  );
console.log("result from admin deep",eventsResult )
  return (
    <div className="space-y-6">
 
      <EventsManagementHeader /> 
 

 

      {/* Search, Filters */}
 
      <EventsFilter />
 

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
         <EventsTable events={eventsResult?.data || []} />
         

         events table here
        <TablePagination
          currentPage={eventsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default EventsManagementPage;
