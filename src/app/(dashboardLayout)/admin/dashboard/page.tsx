import { getAdmins } from "@/services/admin/adminsManagement";
import { getEvents } from "@/services/admin/eventsManagement";
import { getHosts } from "@/services/admin/hostsManagement";
import { getParticipators } from "@/services/admin/participatorsManagement";
import { IEvent } from "@/types/event.type";
import {
  Activity,
  CalendarClock,
  ChartNoAxesCombined,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Users,
} from "lucide-react";

type ApiResult<T> = {
  success?: boolean;
  data?: T[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

const toValidDate = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toPercent = (value: number) => `${Math.round(value)}%`;

export default async function AdminDashboardPage() {
  const [eventsResult, hostsResult, participatorsResult, adminsResult] =
    await Promise.all([
      getEvents("limit=200&sortBy=createdAt&sortOrder=desc"),
      getHosts("limit=1"),
      getParticipators("limit=1"),
      getAdmins("limit=1"),
    ]);

  const events = ((eventsResult as ApiResult<IEvent>)?.data || []).filter(
    (event) => !event.isDeleted
  );

  const totalEvents = (eventsResult as ApiResult<IEvent>)?.meta?.total || 0;
  const totalHosts = (hostsResult as ApiResult<unknown>)?.meta?.total || 0;
  const totalParticipators =
    (participatorsResult as ApiResult<unknown>)?.meta?.total || 0;
  const totalAdmins = (adminsResult as ApiResult<unknown>)?.meta?.total || 0;

  const upcomingCount = events.filter(
    (event) => event.status === "UPCOMING"
  ).length;
  const liveCount = events.filter((event) => event.status === "LIVE").length;
  const completedCount = events.filter(
    (event) => event.status === "COMPLETED"
  ).length;

  const eventsWithSeats = events.filter(
    (event) =>
      typeof event.maxParticipants === "number" &&
      event.maxParticipants > 0 &&
      typeof event.availableSeats === "number"
  );

  const avgSeatUsage = eventsWithSeats.length
    ? eventsWithSeats.reduce((sum, event) => {
        const used = event.maxParticipants! - (event.availableSeats || 0);
        return sum + (used / event.maxParticipants!) * 100;
      }, 0) / eventsWithSeats.length
    : 0;

  const potentialRevenue = events.reduce(
    (sum, event) => sum + (event.joiningFee || 0),
    0
  );

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const recentEvents = events.filter((event) => {
    const createdAt = toValidDate(event.createdAt);
    return createdAt ? createdAt >= thirtyDaysAgo : false;
  }).length;

  const eventTypeCounts = events.reduce<Record<string, number>>((acc, event) => {
    const key = event.eventType || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const typeRows = Object.entries(eventTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const typeTotal = typeRows.reduce((sum, [, count]) => sum + count, 0) || 1;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Admin Analytics
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              EventHub Control Center
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Live snapshot of platform activity, event pipeline, and community
              growth.
            </p>
          </div>
          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Last 30 days</p>
            <p className="text-xl font-bold text-slate-900">{recentEvents}</p>
            <p className="text-xs text-slate-600">new events created</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Total Events</p>
            <CalendarClock className="h-4 w-4 text-orange-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalEvents}</p>
          <p className="mt-1 text-xs text-slate-500">Across all event types</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Participators</p>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {totalParticipators}
          </p>
          <p className="mt-1 text-xs text-slate-500">Registered participants</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Hosts</p>
            <UserRoundCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalHosts}</p>
          <p className="mt-1 text-xs text-slate-500">Active event organizers</p>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Admins</p>
            <ShieldCheck className="h-4 w-4 text-violet-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalAdmins}</p>
          <p className="mt-1 text-xs text-slate-500">System managers</p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Event Status Analysis
            </h2>
            <Activity className="h-4 w-4 text-slate-500" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
                Upcoming
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-900">
                {upcomingCount}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                Live
              </p>
              <p className="mt-2 text-2xl font-bold text-green-900">
                {liveCount}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-700">
                Completed
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {completedCount}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Average Seat Usage</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {toPercent(avgSeatUsage)}
              </p>
            </div>
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Revenue Potential/Event</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                BDT {potentialRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Top Event Types
            </h2>
            <ChartNoAxesCombined className="h-4 w-4 text-slate-500" />
          </div>
          <div className="space-y-3">
            {typeRows.length > 0 ? (
              typeRows.map(([type, count]) => {
                const width = Math.max((count / typeTotal) * 100, 8);
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{type}</span>
                      <span className="text-slate-500">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500">No event data available.</p>
            )}
          </div>
        </article>
      </section>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Recent Events
        </h2>
        <div className="space-y-3">
          {events.slice(0, 6).map((event) => (
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
                <p className="text-xs font-semibold text-slate-700">
                  {event.status}
                </p>
                <p className="text-xs text-slate-500">
                  BDT {event.joiningFee.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-sm text-slate-500">No events found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
