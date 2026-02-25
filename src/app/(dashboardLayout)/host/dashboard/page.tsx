import DashboardVisualGraphs from "@/components/modules/Dashboard/DashboardVisualGraphs";
import { Badge } from "@/components/ui/badge";

import {
  getMyEventParticipators,
  getMyEventReviews,
} from "@/services/host/hostsManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getEvents } from "@/services/event/event.service";
import { IEvent } from "@/types/event.type";
import { CalendarClock, MessageSquare, Star, Users } from "lucide-react";

type ApiResult<T> = {
  data?: T[];
  meta?: { total?: number };
};

interface HostReviewItem {
  rating?: number;
}

export default async function HostDashboardPage() {
  const [userInfo, eventsResult, participatorsResult, reviewsResult] =
    await Promise.all([
      getUserInfo(),
      getEvents("limit=300&sortBy=createdAt&sortOrder=desc"),
      getMyEventParticipators("limit=1"),
      getMyEventReviews("limit=100"),
    ]);

  const hostEmail = userInfo?.email || userInfo?.host?.email || "";

  const allEvents = ((eventsResult as ApiResult<IEvent>)?.data || []).filter(
    (event) =>
      !event.isDeleted &&
      (event.createdByEmail === hostEmail || event.host?.email === hostEmail)
  );

  const totalEvents = allEvents.length;
  const upcomingCount = allEvents.filter((event) => event.status === "UPCOMING").length;
  const liveCount = allEvents.filter((event) => event.status === "LIVE").length;
  const completedCount = allEvents.filter((event) => event.status === "COMPLETED").length;

  const totalParticipators =
    (participatorsResult as ApiResult<unknown>)?.meta?.total || 0;

  const reviews = ((reviewsResult as ApiResult<HostReviewItem>)?.data || []).filter(
    Boolean
  );
  const totalReviews = reviews.length;
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
    : 0;

  const totalRevenuePotential = allEvents.reduce(
    (sum, event) => sum + (event.joiningFee || 0),
    0
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-slate-900 via-cyan-900 to-emerald-800 p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-cyan-100">Host Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Event Performance Center</h1>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50/90">
          Track event pipeline, participant growth, and review trends in one place.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">My Events</p>
            <CalendarClock className="h-4 w-4 text-cyan-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalEvents}</p>
          <p className="mt-1 text-xs text-slate-500">All hosted events</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Participators</p>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalParticipators}</p>
          <p className="mt-1 text-xs text-slate-500">Joined your events</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Reviews</p>
            <MessageSquare className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalReviews}</p>
          <p className="mt-1 text-xs text-slate-500">Total feedback count</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Average Rating</p>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{avgRating.toFixed(1)}</p>
          <p className="mt-1 text-xs text-slate-500">Across all reviews</p>
        </article>
      </section>

      <DashboardVisualGraphs
        title="Hosted Event Flow"
        description="Track current status of your event pipeline."
        bars={[
          { label: "Upcoming", value: upcomingCount, colorClass: "bg-cyan-500" },
          { label: "Live", value: liveCount, colorClass: "bg-emerald-500" },
          { label: "Completed", value: completedCount, colorClass: "bg-slate-600" },
        ]}
        donutLabel="Completion Progress"
        donutValue={completedCount}
        donutTotal={totalEvents}
        summaries={[
          { label: "Revenue Potential", value: `BDT ${totalRevenuePotential.toLocaleString()}` },
          { label: "Active Events", value: upcomingCount + liveCount },
        ]}
      />

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Recent Hosted Events</h2>
        <div className="space-y-3">
          {allEvents.slice(0, 6).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium text-slate-900">{event.title}</p>
                <p className="text-xs text-slate-500">
                  {event.location} | {event.eventType}
                </p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{event.status}</Badge>
                <p className="mt-1 text-xs text-slate-500">
                  BDT {event.joiningFee.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {allEvents.length === 0 && (
            <p className="text-sm text-slate-500">No hosted events found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
