import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDashboardCurrency,
  formatDashboardDateTime,
  getEventStatusClassName,
  getEventStatusBadgeVariant,
  getPaymentStatusClassName,
  isPaidPaymentStatus,
} from "@/lib/participator-dashboard.utils";
import { ParticipatorDashboardEvent } from "@/types/participator-dashboard";

interface ParticipatorEventsTableProps {
  title: string;
  description: string;
  events: ParticipatorDashboardEvent[];
  emptyMessage: string;
}

const ParticipatorEventsTable = ({
  title,
  description,
  events,
  emptyMessage,
}: ParticipatorEventsTableProps) => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-white p-5">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="px-4">Event</TableHead>
              <TableHead className="px-4">Event Date</TableHead>
              <TableHead className="px-4">Joined At</TableHead>
              <TableHead className="px-4">Status</TableHead>
              <TableHead className="px-4">Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              events.map((item) => (
                <TableRow key={item.participationId} className="hover:bg-slate-50/80">
                  <TableCell className="px-4 py-3">
                    <Link
                      href={`/events/${item.eventId}`}
                      className="font-semibold text-slate-800 hover:text-cyan-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {item.eventType} | {item.location}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">
                    {formatDashboardDateTime(item.eventDateTime)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">
                    {formatDashboardDateTime(item.joinedAt)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant={getEventStatusBadgeVariant(item.eventStatus)}
                      className={getEventStatusClassName(item.eventStatus)}
                    >
                      {item.eventStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant={isPaidPaymentStatus(item.paymentStatus) ? "default" : "secondary"}
                      className={getPaymentStatusClassName(item.paymentStatus)}
                    >
                      {item.paymentStatus} ({formatDashboardCurrency(item.amount)})
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ParticipatorEventsTable;
