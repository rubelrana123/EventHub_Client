/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/shared/Button";
import {
  Calendar,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash,
  Loader2,
} from "lucide-react";
import Image from "next/image";
 
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortKey?: string;
}

interface ManagementCardGridProps<T> {
  data: T[];
  columns: Column<T>[]; // kept for compatibility (not used visually)
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementCardGrid<T>({
  data = [],
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No events found.",
  isRefreshing = false,
}: ManagementCardGridProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Refresh Overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((event: any) => {
          const date = new Date(event.dateTime);

          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={getRowKey(event)}
              className="group bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Banner */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.bannerPhoto || "/placeholder.png"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-[#ff4000] uppercase">
                  {event.eventType}
                </div>

                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-semibold text-white">
                  ৳{event.joiningFee}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 text-[#ff4000]" />
                  {formattedDate}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#ff4000] transition-colors">
                  {event.title}
                </h3>

                {/* Time & Location */}
                <div className="space-y-2 text-sm text-gray-600 mb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formattedTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center gap-2 mt-auto">
                  {onView && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(event)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  )}

                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(event)}
                      className="text-blue-600"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}

                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(event)}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManagementCardGrid;
