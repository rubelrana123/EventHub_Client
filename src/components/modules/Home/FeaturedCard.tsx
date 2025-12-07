 "use client"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

interface Event {
  id: string;
  title: string;
  description: string;
  bannerPhoto: string;
  dateTime: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  eventType: string;
  hostId: string;
  createdByEmail: string;
  isDeleted: boolean;
}

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const dateObj = new Date(event?.dateTime);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.bannerPhoto || "/placeholder.png"}
          alt={event?.title}
          width={500}
          height={500}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#ff4000] uppercase tracking-wide">
          {event?.eventType}
        </div>

        <div className="absolute top-4 right-4 bg-[#303030]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          ${event?.joiningFee}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col">
        
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 text-[#ff4000]" />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#444444] mb-2 group-hover:text-[#ff4000] transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Time & Location */}
        <div className="space-y-2 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{formattedTime}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-auto">
          <Link href={`/events/${event.id}`}>
            <Button
              variant="outline"
              className="group-hover:bg-[#ff4000] group-hover:text-white group-hover:border-[#ff4000]"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          {onEdit && (
            <Button
              variant="ghost"
              onClick={() => onEdit(event)}
              className="text-blue-500"
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              onClick={() => onDelete(event.id)}
              className="text-red-500"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
