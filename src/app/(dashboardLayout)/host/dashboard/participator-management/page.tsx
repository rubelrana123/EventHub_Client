import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, queryStringFormatter } from "@/lib/formatters";
import { getMyEventParticipators } from "@/services/admin/hostsManagement";

interface MyEventParticipator {
  id: string;
  joinedAt: string;
  event?: {
    id: string;
    title: string;
    eventType: string;
    dateTime: string;
    location: string;
    status: string;
  };
  participator?: {
    id: string;
    name: string;
    email: string;
    contactNumber?: string | null;
  };
  payment?: {
    status?: string;
    amount?: number;
  } | null;
}

const HostParticipatorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getMyEventParticipators(queryString);

  const participators: MyEventParticipator[] = result?.data || [];
  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="My Event Participators"
        description="All participators who joined your events"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participator</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No participators joined your events yet.
                </TableCell>
              </TableRow>
            ) : (
              participators.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium">{item.participator?.name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.participator?.email || "No email"}
                    </p>
                    {item.participator?.contactNumber && (
                      <p className="text-xs text-muted-foreground">
                        {item.participator.contactNumber}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">{item.event?.title || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.event?.eventType || "N/A"} | {item.event?.location || "N/A"}
                    </p>
                    {item.event?.status && (
                      <Badge variant="secondary" className="mt-1">
                        {item.event.status}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-sm">
                    {formatDateTime(item.joinedAt)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        item.payment?.status === "PAID" || item.payment?.status === "SUCCESS"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {item.payment?.status || "UNPAID"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={result?.meta?.page || 1}
        totalPages={totalPages || 1}
      />
    </div>
  );
};

export default HostParticipatorManagementPage;
