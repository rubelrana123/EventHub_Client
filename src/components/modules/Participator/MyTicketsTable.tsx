"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  getPaymentStatusClassName,
  isPaidPaymentStatus,
} from "@/lib/participator-dashboard.utils";
import { ParticipatorDashboardEvent } from "@/types/participator-dashboard";
import { bookEvent } from "@/services/participator/bookEvent";
import { useState } from "react";

interface MyTicketsTableProps {
  tickets: ParticipatorDashboardEvent[];
}

const MyTicketsTable = ({ tickets }: MyTicketsTableProps) => {
  const [repayingId, setRepayingId] = useState<string>("");

  const handleRepay = async (eventId: string) => {
    try {
      setRepayingId(eventId);
      const result = await bookEvent(eventId);

      if (!result?.success) {
        toast.error(result?.message || "Payment initiation failed");
        return;
      }

      if (!result?.data?.paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      sessionStorage.setItem("paymentReturnUrl", `/events/${eventId}`);
      window.location.href = result.data.paymentUrl;
    } catch {
      toast.error("Failed to start repayment");
    } finally {
      setRepayingId("");
    }
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-white p-5">
        <h1 className="text-2xl font-bold text-slate-800">My Tickets</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tickets you joined with payment status.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="px-4">Event</TableHead>
              <TableHead className="px-4">Event Date</TableHead>
              <TableHead className="px-4">Amount</TableHead>
              <TableHead className="px-4">Payment Status</TableHead>
              <TableHead className="px-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => {
                const isPaid = isPaidPaymentStatus(ticket.paymentStatus);

                return (
                  <TableRow key={ticket.participationId} className="hover:bg-slate-50/80">
                    <TableCell className="px-4 py-3">
                      <Link
                        href={`/events/${ticket.eventId}`}
                        className="font-semibold text-slate-800 hover:text-cyan-700 hover:underline"
                      >
                        {ticket.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {ticket.eventType} | {ticket.location}
                      </p>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-slate-600">
                      {formatDashboardDateTime(ticket.eventDateTime)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-slate-600">
                      {formatDashboardCurrency(ticket.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={isPaid ? "default" : "secondary"}
                        className={getPaymentStatusClassName(ticket.paymentStatus)}
                      >
                        {ticket.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {isPaid ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          Paid
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleRepay(ticket.eventId)}
                          size="sm"
                          disabled={repayingId === ticket.eventId}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-900"
                        >
                          {repayingId === ticket.eventId ? "Redirecting..." : "Repay"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MyTicketsTable;
