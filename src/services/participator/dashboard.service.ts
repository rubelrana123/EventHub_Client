"use server";

import { isPaidPaymentStatus } from "@/lib/participator-dashboard.utils";
import { ParticipatorDashboardData, ParticipatorDashboardEvent } from "@/types/participator-dashboard";
import { getUserInfo } from "../auth/getUserInfo";

interface RawEventParticipation {
  id?: string;
  joinedAt?: string;
  isBooked?: boolean;
  event?: {
    id?: string;
    title?: string;
    location?: string;
    eventType?: string;
    status?: string;
    dateTime?: string;
    joiningFee?: number;
  };
}

interface RawPayment {
  id?: string;
  eventId?: string;
  eventParticipationId?: string;
  amount?: number;
  status?: string;
}

const ACTIVE_EVENT_STATUSES = new Set(["UPCOMING", "LIVE", "REGISTRATION_CLOSED"]);

export async function getParticipatorDashboardData(): Promise<ParticipatorDashboardData> {
  const userInfo = await getUserInfo();

  const profile = {
    name: userInfo?.participator?.name || userInfo?.name || "Participator",
    email: userInfo?.participator?.email || userInfo?.email || "",
    address: userInfo?.participator?.address || null,
    interests: userInfo?.participator?.interests || null,
    bio: userInfo?.participator?.bio || null,
  };

  const participations: RawEventParticipation[] = Array.isArray(userInfo?.eventParticipations)
    ? userInfo.eventParticipations
    : [];
  const payments: RawPayment[] = Array.isArray(userInfo?.payments)
    ? userInfo.payments
    : [];

  const events: ParticipatorDashboardEvent[] = participations
    .map((participation) => {
      const matchedPayment = payments.find(
        (payment) =>
          (payment.eventParticipationId && payment.eventParticipationId === participation.id) ||
          (payment.eventId && payment.eventId === participation.event?.id)
      );

      const paymentStatus = matchedPayment?.status || (participation.isBooked ? "PAID" : "UNPAID");
      const amount =
        typeof matchedPayment?.amount === "number"
          ? matchedPayment.amount
          : participation.event?.joiningFee || 0;

      return {
        participationId: participation.id || "",
        eventId: participation.event?.id || "",
        title: participation.event?.title || "Untitled Event",
        location: participation.event?.location || "N/A",
        eventType: participation.event?.eventType || "General",
        eventStatus: participation.event?.status || "UNKNOWN",
        eventDateTime: participation.event?.dateTime || "",
        joinedAt: participation.joinedAt || "",
        isBooked: Boolean(participation.isBooked),
        paymentStatus,
        amount,
      };
    })
    .filter((item) => item.eventId);

  events.sort((a, b) => {
    const aTime = new Date(a.eventDateTime || a.joinedAt).getTime() || 0;
    const bTime = new Date(b.eventDateTime || b.joinedAt).getTime() || 0;
    return bTime - aTime;
  });

  const activeEventsList = events.filter((item) =>
    ACTIVE_EVENT_STATUSES.has((item.eventStatus || "").toUpperCase())
  );
  const historyEvents = events.filter(
    (item) => !ACTIVE_EVENT_STATUSES.has((item.eventStatus || "").toUpperCase())
  );
  const paidEvents = events.filter((item) => isPaidPaymentStatus(item.paymentStatus));

  const summary = {
    totalJoined: events.length,
    activeEvents: activeEventsList.length,
    completedEvents: historyEvents.length,
    paidEvents: paidEvents.length,
    totalSpent: paidEvents.reduce((total, item) => total + (item.amount || 0), 0),
  };

  return {
    profile,
    summary,
    allEvents: events,
    activeEventsList,
    historyEvents,
  };
}
