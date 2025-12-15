 
 
import ParticipatorsFilter from "@/components/modules/Admin/ParticipatorsManagement/ParticipatorssFilter";
import ParticipatorsManagementHeader from "@/components/modules/Admin/ParticipatorsManagement/ParticipatorssManagementHeader";
import ParticipatorsTable from "@/components/modules/Admin/ParticipatorsManagement/ParticipatorsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getParticipators } from "@/services/admin/participatorsManagement";
import { Suspense } from "react";

const  ParticipatorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const participatorsResult = await getParticipators(queryString);

  const totalPages = Math.ceil(
    (participatorsResult?.meta?.total || 1) / (participatorsResult?.meta?.limit || 1)
  );
console.log("result from admin deep",participatorsResult )
  return (
    <div className="space-y-6">
      <ParticipatorsManagementHeader />

      {/* Search, Filters */}
      <ParticipatorsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <ParticipatorsTable participators={participatorsResult?.data?.data || []} />
        <TablePagination
          currentPage={participatorsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default ParticipatorsPage;
