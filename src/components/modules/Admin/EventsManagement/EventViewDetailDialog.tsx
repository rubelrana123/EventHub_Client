"use client";

import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IEvent } from "@/types/event.type";

import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  User,
  Star,
} from "lucide-react";
import Image from "next/image";

interface IEventViewDialogProps {
  open: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const EventViewDetailDialog = ({
  open,
  onClose,
  event,
}: IEventViewDialogProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* ================= Banner ================= */}
          <div className="relative w-full h-56 rounded-lg overflow-hidden">
            <Image
              src={event.bannerPhoto || "/placeholder.png"}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge>{event.eventType}</Badge>
              <Badge variant="secondary">{event.status}</Badge>
            </div>
          </div>

          {/* ================= Title ================= */}
          <div>
            <h2 className="text-3xl font-bold mb-1">{event.title}</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          {/* ================= Event Info ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
              <InfoRow
                label="Date & Time"
                value={formatDateTime(event.dateTime)}
              />
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <InfoRow label="Location" value={event.location} />
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 mt-1 text-muted-foreground" />
              <InfoRow
                label="Participants"
                value={`${event.availableSeats}/${event.maxParticipants}`}
              />
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
              <InfoRow
                label="Joining Fee"
                value={`৳${event.joiningFee}`}
              />
            </div>
          </div>

          <Separator />

          {/* ================= Host Information ================= */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Host Information</h3>
            </div>

            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={event?.host.profilePhoto}
                  alt={event?.host.name}
                />
                <AvatarFallback>
                  {getInitials(event?.host.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-semibold">{event?.host.name}</p>
                <p className="text-sm text-muted-foreground">
                  {event?.host.email}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {event?.host.averageRating || 0}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* ================= Meta Info ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
            <InfoRow
              label="Created At"
              value={formatDateTime(event.createdAt)}
            />
            <InfoRow
              label="Last Updated"
              value={formatDateTime(event.updatedAt)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventViewDetailDialog;
