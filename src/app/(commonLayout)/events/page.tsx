/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import EventsFilter from "@/components/modules/Event/EventsFilter";
import EventCard from "@/components/shared/EventCard";
import TablePagination from "@/components/shared/TablePagination";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getAllEvents } from "@/services/event/event.service";

import { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Browse Events - Find Your Next Experience | Eventora",
  description: "Explore thousands of events happening near you. Filter by location, type, and date to find concerts, workshops, conferences, sports events, and more on Eventora.",
  keywords: ["browse events", "find events", "event search", "local events", "upcoming events", "event categories", "event types"],
  openGraph: {
    title: "Browse Events - Find Your Next Experience | Eventora",
    description: "Explore thousands of events happening near you. Filter by location, type, and date.",
    type: "website",
    url: "https://eventora.com/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Events - Find Your Next Experience | Eventora",
    description: "Explore thousands of events happening near you.",
  },
};

interface SearchParams {
    searchTerm?: string;
    status?: string;
    location?: string;
    type?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}

export default async function EventsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {

    const params = await searchParams;
    const user = await getUserInfo();

    const token = await getCookie("accessToken");
    
    // Build query string from search params
    const queryParams = new URLSearchParams();
    if (params.searchTerm) queryParams.set("searchTerm", params.searchTerm);
    if (params.status) queryParams.set("status", params.status);
    if (params.location) queryParams.set("location", params.location);
    if (params.type) queryParams.set("type", params.type);
    if (params.page) queryParams.set("page", params.page);
    if (params.limit) queryParams.set("limit", params.limit);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

    const eventsResponse = await getAllEvents(queryParams.toString());
    const allEventsData = await getAllEvents();

    // Get unique locations from all events
    const allLocations = allEventsData?.data?.map((event: any) => event.location) || [];
    const uniqueLocations = [...new Set(allLocations)];

    // Get unique event types from all events
    const allTypes = allEventsData?.data?.map((event: any) => event.eventType) || [];
    const uniqueTypes = [...new Set(allTypes)];

    const eventsData = eventsResponse?.data || [];
    const eventsMeta = eventsResponse?.meta || { page: 1, limit: 10, total: 0 };
    const totalPages = Math.max(1, Math.ceil((eventsMeta.total || 0) / (eventsMeta.limit || 10)));

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="py-8 text-center">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-emerald-600">Latest Events</span>
                </h2>
                <p className="text-gray-600 mt-2 max-w-[500px] mx-auto">Discover the latest events and activities happening around you. Filter by location, type, status and more.</p>
            </div>

            <EventsFilter
                locations={uniqueLocations}
                types={uniqueTypes}
            />

            {/* Results Count */}
            {eventsResponse?.meta && (
                <div className="py-4 text-sm text-gray-600">
                    Showing {eventsData.length} of {eventsMeta.total} events
                    {params.searchTerm && ` for "${params.searchTerm}"`}
                </div>
            )}

            {/* Grid */}
            {eventsData.length > 0 ? (
                <EventCard events={{ data: { data: eventsData } }} currentUser={user} token={token} />
            ) : (
                <div className="py-20 text-center">
                    <p className="text-gray-500 text-lg">No events found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
            )}

            <TablePagination
                currentPage={eventsMeta.page || 1}
                totalPages={totalPages}
            />

        </section>
    )
}
