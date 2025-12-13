 
 
import HostsFilter from "@/components/modules/Admin/HostsManagement/HostsFilter";
import HostsManagementHeader from "@/components/modules/Admin/HostsManagement/HostsManagementHeader";
import HostsTable from "@/components/modules/Admin/HostsManagement/HostsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getHosts } from "@/services/admin/hostsManagement";
 
import { Suspense } from "react";

const  HostsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const hostsResult = await getHosts(queryString);

  const totalPages = Math.ceil(
    (hostsResult?.meta?.total || 1) / (hostsResult?.meta?.limit || 1)
  );
console.log("result from admin deep",hostsResult )
  return (
    <div className="space-y-6">
      <HostsManagementHeader />

      {/* Search, Filters */}
      <HostsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <HostsTable hosts={hostsResult?.data || []} />
        <TablePagination
          currentPage={hostsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default HostsManagementPage;
