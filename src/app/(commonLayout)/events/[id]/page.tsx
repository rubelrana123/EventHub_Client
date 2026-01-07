"use client";
import {
  Calendar,
  MapPin,  Share2,
  Heart,
  User,
  Info,
  Tag,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";
import testData from "../../../../assets/data/test";
import { bookEvent } from "@/services/participator/bookEvent";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams();
  const [isBooking, setIsBooking] = useState(false);

  // Find the event from testData
  const event = testData.data.find((ev) => ev.id === id);
  console.log(id, event, "data from params");

  const handleBookEvent = async () => {
    setIsBooking(true);
    try {
      await bookEvent(id as string);
      alert("Event booked successfully!");
      // Optionally, redirect or update UI
    } catch (error) {
      alert("Failed to book event. Please try again.");
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };

  if (!event) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Event not found!
      </div>
    );
  }

  const dateObj = new Date(event.dateTime);

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
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={event.bannerPhoto || "/placeholder.png"}
          alt={event.title}
          width={2000}
          height={1200}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span className="px-4 py-1 bg-[#ff4000] text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {event.eventType}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              {event.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#ff4000]" />
                <span className="font-medium">
                  Hosted by {event.host.name}
                </span>
              </div>

              <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></div>

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#ff4000] fill-current" />
                <span className="font-medium">
                  {event.host.averageRating.toFixed(1)} (0 reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Top Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-[#ff4000]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Date & Time</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formattedDate}
                  </p>
                  <p className="text-gray-500 text-sm">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <MapPin className="h-6 w-6 text-[#b700ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600 text-sm mt-1">{event.location}</p>

                  <button className="text-[#ff4000] text-sm font-medium hover:underline mt-1">
                    View on Map
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-[#444444] mb-6 flex items-center gap-2">
                <Info className="h-6 w-6 text-[#ff4000]" />
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </section>

            {/* Tags */}
            <section>
              <h3 className="text-lg font-bold text-[#444444] mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-[#ff4000]" />
                Category
              </h3>

              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                #{event.eventType}
              </span>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500">Price</span>
                  <span className="text-3xl font-bold text-[#303030]">
                    ${event.joiningFee}
                  </span>
                </div>+
          

                <p className="text-sm text-gray-700 mb-4">
                  Available Seats:{" "}
                  <strong>{event.availableSeats}</strong>
                </p>
                <Link href="/join/:id">
                <Button
                  onClick={handleBookEvent}
                  disabled={isBooking}
                  className="w-full mb-4 shadow-lg shadow-orange-200"
                >
                  {/* {isBooking ? "Booking..." : "Book Now"} */}
                  Book Now
                </Button>
                </Link>
                


                <p className="text-center text-xs text-gray-400 mb-6">
                  No booking fees. 100% secure payment.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="sm" className="flex gap-2">
                    <Heart className="h-4 w-4" /> Save
                  </Button>

                  <Button variant="outline" size="sm" className="flex gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>
              </div>

              {/* Organizer */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Organizer</h3>

                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={event.host.profilePhoto}
                    alt={event.host.name}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-bold text-gray-900">
                      {event.host.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {event.host.email}
                    </p>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  Contact Organizer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}