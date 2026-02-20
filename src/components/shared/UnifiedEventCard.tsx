import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock3, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UnifiedEventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    bannerPhoto?: string | null;
    dateTime: string;
    location: string;
    eventType: string;
    status?: string;
    joiningFee: number;
    availableSeats?: number | null;
  };
  actions?: React.ReactNode;
}

const UnifiedEventCard = ({ event, actions }: UnifiedEventCardProps) => {
  const eventDate = new Date(event.dateTime);

  const formattedDate = Number.isNaN(eventDate.getTime())
    ? "Date TBA"
    : eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  const formattedTime = Number.isNaN(eventDate.getTime())
    ? "Time TBA"
    : eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={event.bannerPhoto || "/placeholder.png"}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge className="bg-cyan-600 text-white">{event.eventType}</Badge>
          {event.status ? (
            <Badge variant="secondary" className="bg-white/90 text-slate-700">
              {event.status}
            </Badge>
          ) : null}
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white">
          BDT {event.joiningFee}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <Link
            href={`/events/${event.id}`}
            className="line-clamp-2 text-lg font-bold text-slate-800 transition-colors hover:text-cyan-700"
          >
            {event.title}
          </Link>
          {event.description ? (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{event.description}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-700" />
            {formattedDate}
          </p>
          <p className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-cyan-700" />
            {formattedTime}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-700" />
            {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-cyan-700" />
            {typeof event.availableSeats === "number"
              ? `${event.availableSeats} seats left`
              : "Seat info unavailable"}
          </p>
        </div>

        {actions ? <div className="grid grid-cols-2 gap-2">{actions}</div> : null}
      </div>
    </article>
  );
};

export default UnifiedEventCard;
