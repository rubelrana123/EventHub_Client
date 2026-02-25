 
 
import HostApplication from "@/components/modules/Admin/HostsManagement/HostApplication";
import HostsFilter from "@/components/modules/Admin/HostsManagement/HostsFilter";
import HostsManagementHeader from "@/components/modules/Admin/HostsManagement/HostsManagementHeader";
import HostsTable from "@/components/modules/Admin/HostsManagement/HostsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getHostApplications, getHosts } from "@/services/host/hostsManagement";
 
import { Suspense } from "react";

const  HostsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const hostsResult = await getHosts(queryString);
  const hostApplicationsResult = await getHostApplications ();


  const totalPages = Math.ceil(
    (hostsResult?.meta?.total ) / (hostsResult?.meta?.limit )
  );
console.log("result from host deep", hostsResult , "host application", hostApplicationsResult);
  return (
    <div className="space-y-6">
      <HostsManagementHeader />

      {/* Search, Filters */}
      <HostsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <HostsTable hosts={hostsResult?.data || []} />
        <TablePagination
          currentPage={hostsResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>

     <HostApplication hostApplicationsResult={hostApplicationsResult?.data} />
    </div>
  );
};

export default HostsManagementPage;
