 
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FeaturedEventCard } from "./FeaturedCard";
import testData from "../../../../test";

export default function FeaturedEvent() {
  const events = testData?.data || [];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#444444] mb-4">
              Featured Events
            </h2>
            <p className="text-gray-600">
              Explore our hand-picked selection of upcoming events.
            </p>
          </div>

          <Button variant="ghost" className="hidden sm:flex">
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <FeaturedEventCard key={event.id} event={event} />
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
