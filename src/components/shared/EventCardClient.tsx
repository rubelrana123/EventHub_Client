/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
 
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

      // Handle Join Now button click
    const handlePayment = async (eventId: string) => {
        try {

            if (!token) {
                toast.error("Authentication required. Please login.");
                return;
            }

            const payload: any = { eventId };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token as string
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!result?.data?.paymentUrl) {
                toast.error("Payment URL not found try gain 2min later");
                throw new Error("Payment URL not found");
            }

            if (result?.error) {
                toast.error(result?.error);
                throw new Error(result?.error);
            }

            toast.success("Redirecting to payment page....");
            window.location.href = result?.data?.paymentUrl

        } catch (error) {
            console.error("Payment error:", error);
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
            <Card
              key={event.id}
              className={cn(
                "group overflow-hidden rounded-xl border shadow-sm transition-all",
                "hover:shadow-lg hover:-translate-y-1"
              )}
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={event.bannerPhoto || "/placeholder.png"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  {event.eventType}
                </span>

                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  ৳{event.joiningFee}
                </span>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold mb-2">
                  {event.title}
                </CardTitle>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.dateTime).toLocaleDateString()}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="w-1/2 text-center border border-primary text-primary bg-purple-50 hover:bg-white px-4 py-2 rounded-md text-sm font-semibold"
                  >
                    View Details
                  </Link>

                  {isPaid ? (
                    <Button
                      variant="destructive"
                      className="w-1/2"
                      onClick={() => handleLeaveClick(event)}
                    >
                      Leave Event
                    </Button>
                  ) : (
                    <Button
                      className="w-1/2"
                      onClick={() => handlePayment(event.id)}
                      disabled={event.status !== "UPCOMING"}
                    >
                      Join Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
