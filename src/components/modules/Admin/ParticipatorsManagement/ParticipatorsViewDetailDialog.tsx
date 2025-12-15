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
import { IParticipator } from "@/types/participator.type";

import {
  Calendar,
  Mail,
  Phone,
  Shield,
  User,
  MapPin,
  CalendarDays,
} from "lucide-react";

interface IParticipatorViewDialogProps {
  open: boolean;
  onClose: () => void;
  participator: IParticipator | null;
}

const ParticipatorViewDetailDialog = ({
  open,
  onClose,
  participator,
}: IParticipatorViewDialogProps) => {
  if (!participator) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Participator Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={participator.profilePhoto || ""} />
              <AvatarFallback className="text-2xl">
                {getInitials(participator.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold">{participator.name}</h2>

              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                {participator.email}
              </p>

              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Badge
                  variant={participator.isDeleted ? "destructive" : "default"}
                >
                  {participator.isDeleted ? "Inactive" : "Active"}
                </Badge>
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  Participator
                </Badge>
              </div>
            </div>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <section>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-600" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow
                label="Phone"
                value={participator.contactNumber || "N/A"}
              />
              <InfoRow label="Email" value={participator.email} />
              <InfoRow
                label="Address"
                value={participator.address || "N/A"}
              />
              <InfoRow
                label="Interests"
                value={participator.interests || "N/A"}
              />
            </div>
          </section>

          <Separator />

          {/* ================= BIO ================= */}
          {participator.bio && (
            <>
              <section>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-600" />
                  About
                </h3>
                <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  {participator.bio}
                </p>
              </section>
              <Separator />
            </>
          )}

          {/* ================= PARTICIPATED EVENTS ================= */}
          <section>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-green-600" />
              Participated Events ({participator.eventParticipations.length})
            </h3>

            {participator.eventParticipations.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No events joined yet.
              </p>
            ) : (
              <div className="space-y-4">
                {participator.eventParticipations.map((item) => {
                  const event = item.event;

                  return (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 bg-background hover:shadow-sm transition"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {event.title}
                          </h4>

                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </p>

                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {formatDateTime(event.dateTime)}
                          </p>
                        </div>

                        <Badge>{event.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <InfoRow label="Event Type" value={event.eventType} />
                        <InfoRow
                          label="Fee"
                          value={`৳ ${event.joiningFee}`}
                        />
                        <InfoRow
                          label="Seats"
                          value={`${event.availableSeats}/${event.maxParticipants}`}
                        />
                        <InfoRow
                          label="Booked"
                          value={item.isBooked ? "Yes" : "No"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipatorViewDetailDialog;
