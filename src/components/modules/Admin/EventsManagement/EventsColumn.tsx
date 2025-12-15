"use client";

import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Column } from "@/components/shared/ManagementTable";
import { IEvent } from "@/types/event.type";
 
/**
 * These columns are NOT rendered as table rows anymore,
 * but they keep the same structure for:
 * - sorting
 * - shared management logic
 * - future table ↔ card switching
 */
export const eventsColumns: Column<IEvent>[] = [
  {
    header: "Event",
    accessor: (event) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm line-clamp-1">
          {event.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {event.eventType}
        </span>
      </div>
    ),
    sortKey: "title",
  },
  {
    header: "Date",
    accessor: (event) => (
      <div className="flex items-center gap-1 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {new Date(event.dateTime).toLocaleDateString()}
      </div>
    ),
    sortKey: "dateTime",
  },
  {
    header: "Location",
    accessor: (event) => (
      <div className="flex items-center gap-1 text-sm">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="line-clamp-1">{event.location}</span>
      </div>
    ),
  },
  {
    header: "Participants",
    accessor: (event) => (
      <div className="flex items-center gap-1 text-sm">
        <Users className="h-4 w-4 text-muted-foreground" />
        {event.availableSeats}/{event.maxParticipants}
      </div>
    ),
  },
  {
    header: "Fee",
    accessor: (event) => (
      <div className="flex items-center gap-1 text-sm font-medium">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        {event.joiningFee}
      </div>
    ),
    sortKey: "joiningFee",
  },
];
