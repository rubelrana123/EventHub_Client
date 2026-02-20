/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import UnifiedEventCard from "./UnifiedEventCard";
import { bookEvent } from "@/services/participator/bookEvent";
 
interface IEventApiResponse {
  data: {
    data: any[];
  };
}

interface ICurrentUser {
  id: string;
  email: string;
  role: "PARTICIPATOR" | "HOST" | "ADMIN";
}

interface EventCardClientProps {
  events: IEventApiResponse;
  currentUser?: ICurrentUser;
  token?: string | null;
}

export default function EventCardClient({
  events,
  currentUser,
  token,
}: EventCardClientProps) {
  const router = useRouter();
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const currentUserId = currentUser?.id;

  /**
   * User joined + payment completed
   */
  const hasUserPaid = (event: any) => {
    if (!currentUserId) return false;

    return event.participators?.some(
      (p: any) =>
        p.userId === currentUserId &&
        p.payment?.status === "PAID"
    );
  };

  const handleLeaveClick = (event: any) => {
    setSelectedEvent(event);
    setIsLeaveOpen(true);
  };

  const handleBuyTicket = async (eventId: string) => {
    try {
      const result = await bookEvent(eventId);

      if (!result?.success) {
        toast.error(result?.message || "Payment initiation failed");
        return;
      }

      if (!result?.data?.paymentUrl) {
        toast.error("Payment URL not found. Please try again.");
        return;
      }

      toast.success("Redirecting to payment page...");
      window.location.href = result.data.paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to start payment.");
    }
  };

  const handleLeaveConfirm = async () => {
    if (!selectedEvent || !token) {
      toast.error("Authentication required.");
      return;
    }

    setIsLeaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/participants/leave/${selectedEvent.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { authorization: token },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to leave event");
        return;
      }

      toast.success("Successfully left the event");
      setIsLeaveOpen(false);
      setSelectedEvent(null);
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
        {events?.data?.data?.map((event: any) => {
          const isPaid = hasUserPaid(event);

          return (
            <UnifiedEventCard
              key={event.id}
              event={event}
              actions={
                <>
                  <Link href={`/events/${event.id}`} className="col-span-2">
                    <Button
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-700 hover:bg-cyan-50"
                    >
                      View Details
                    </Button>
                  </Link>

                  {isPaid ? (
                    <Button
                      variant="destructive"
                      className="col-span-2"
                      onClick={() => handleLeaveClick(event)}
                    >
                      Leave Event
                    </Button>
                  ) : (
                    <Button
                      className="col-span-2 w-full bg-slate-900 text-white hover:bg-cyan-800"
                      onClick={() => handleBuyTicket(event.id)}
                      disabled={event.status !== "UPCOMING"}
                    >
                      Buy Ticket
                    </Button>
                  )}
                </>
              }
            />
          );
        })}
      </div>

      <DeleteConfirmationDialog
        isOpen={isLeaveOpen}
        onClose={() => {
          setIsLeaveOpen(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleLeaveConfirm}
        title="Leave Event"
        description={`Are you sure you want to leave "${selectedEvent?.title}"?`}
        isDeleting={isLeaving}
      />
    </>
  );
}
