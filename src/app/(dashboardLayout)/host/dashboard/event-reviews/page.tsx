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
import { getMyEventReviews } from "@/services/host/hostsManagement";

interface HostEventReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  event?: {
    id: string;
    title: string;
    eventType: string;
    location: string;
    status: string;
  };
  participator?: {
    id: string;
    name: string;
    email: string;
  };
}

const HostEventReviewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getMyEventReviews(queryString);
  const reviews: HostEventReview[] = result?.data || [];

  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Event Reviews"
        description="All reviews for your hosted events"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Participator</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Reviewed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No reviews found for your events.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <p className="font-medium">{review.event?.title || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.event?.eventType || "N/A"} |{" "}
                      {review.event?.location || "N/A"}
                    </p>
                    {review.event?.status && (
                      <Badge variant="secondary" className="mt-1">
                        {review.event.status}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">
                      {review.participator?.name || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.participator?.email || "No email"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge>{review.rating}/5</Badge>
                  </TableCell>

                  <TableCell className="max-w-[300px] text-sm">
                    {review.comment || "No comment"}
                  </TableCell>

                  <TableCell className="text-sm">
                    {formatDateTime(review.createdAt)}
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

export default HostEventReviewsPage;
