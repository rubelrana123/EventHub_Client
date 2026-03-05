"use client";

import {
  Calendar,
  MapPin,
  User,
  Info,
  Tag,
  Star,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EventDetailsPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
}

export default function EventDetailsPage({ event }: EventDetailsPageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = Math.max(1, Number(event.availableSeats || 1));

  const handlePurchaseTicket = () => {
    router.push(`/events/${event.id}/checkout?quantity=${quantity}`);
  };

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
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={event.bannerPhoto || "/placeholder.png"}
          alt={event.title}
          width={2000}
          height={1200}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span className="px-4 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full">
              {event.eventType}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              {event.title}
            </h1>
            <div className="flex gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-cyan-400" />
                Hosted by {event?.host?.name}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                {event?.host?.averageRating?.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <div className="flex gap-6">
              <Calendar className="text-cyan-600" />
              <div>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <MapPin className="text-cyan-600" />
              <p>{event.location}</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold flex gap-2">
              <Info className="text-cyan-600" />
              About This Event
            </h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </section>

          <section>
            <h3 className="font-bold flex gap-2">
              <Tag className="text-cyan-600" />
              Category
            </h3>
            <span className="px-4 py-2 bg-gray-100 rounded-lg">
              #{event.eventType}
            </span>
          </section>
        </div>

        {/* Sidebar */}
        <div className="sticky top-24">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <div className="flex justify-between mb-4">
              <span>Price</span>
              <span className="text-2xl font-bold">
                ${event.joiningFee}
              </span>
            </div>

            <p className="mb-4">
              Available Seats: <strong>{event.availableSeats}</strong>
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Quantity</p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="min-w-12 rounded-md border px-3 py-2 text-center font-semibold">
                  {quantity}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity((prev) => Math.min(maxQuantity, prev + 1))
                  }
                  disabled={quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Total: ${(Number(event.joiningFee) * quantity).toFixed(2)}
              </p>
            </div>

            <Button
              onClick={handlePurchaseTicket}
              disabled={maxQuantity < 1}
              className="w-full bg-primary text-white  shadow-cyan-100"
            >
              Purchase Ticket
            </Button>

            <p className="text-xs text-center text-gray-400 mt-4">
              100% secure payment
            </p>
{/* //under the construction */}
            {/* <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
