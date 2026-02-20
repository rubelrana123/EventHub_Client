"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedEventCard from "@/components/shared/UnifiedEventCard";

interface Event {
  id: string;
  title: string;
  description: string;
  bannerPhoto: string | null;
  dateTime: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;
  availableSeats: number;
  joiningFee: number;
  eventType: string;
  status: string;
  hostId: string;
  createdByEmail: string;
}

interface Props {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: Props) {
  return (
    <UnifiedEventCard
      event={event}
      actions={
        <>
          <Link href={`/events/${event.id}`} className="col-span-2">
            <Button variant="outline" className="w-full border-cyan-600 text-cyan-700 hover:bg-cyan-50">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          {onEdit && (
            <Button
              variant="ghost"
              onClick={() => onEdit(event)}
              className="text-cyan-700"
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              onClick={() => onDelete(event.id)}
              className="text-rose-600"
            >
              Delete
            </Button>
          )}
        </>
      }
    />
  );
}
