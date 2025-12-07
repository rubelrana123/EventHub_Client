 
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { EventData } from "./EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventFormProps {
  initialData?: EventData | null;
  onSubmit: (data: Omit<EventData, "id">) => void;
  onCancel: () => void;
}

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<Omit<EventData, "id">>({
    title: "",
    date: "",
    location: "",
    description: "",
    status: "upcoming",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill editing data
  useEffect(() => {
    if (initialData) {
      // setFormData({
      //   title: initialData.title,
      //   date: initialData.date,
      //   location: initialData.location,
      //   description: initialData.description,
      //   status: initialData.status,
      // });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Event name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">

        {/* Title */}
        <div>
          <Input
            placeholder="e.g. Annual Tech Conference"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            autoFocus
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Date + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Status dropdown */}
          <div>
            <label className="block text-sm font-medium text-[#444444] mb-1">
              Status
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#444444] focus:outline-none focus:ring focus:ring-red-400"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as any,
                })
              }
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <Input
            placeholder="e.g. Convention Center, Hall A"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#444444] mb-1">
            Description
          </label>
          <textarea
            className={`flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#444444] placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-red-400 ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Describe your event..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
