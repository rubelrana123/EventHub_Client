/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { EventCard } from "./EventCard";
import { getEvents } from "@/services/event/event.service";
 
export default async function FeaturedEvent() {
  // const events = testData?.data || [];
  const events = await getEvents();
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Featured Events
            </h2>
            <p className="text-gray-600">
              Explore our hand-picked selection of upcoming events.
            </p>
          </div>

          <Button variant="ghost" className="hidden text-slate-700 hover:text-cyan-700 sm:flex">
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events?.data?.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Mobile button */}
        <div className="mt-12 text-center sm:hidden">
          <Button variant="outline">View All Events</Button>
        </div>
      </div>
    </section>
  );
}
