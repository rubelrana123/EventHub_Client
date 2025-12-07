/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EventCard } from "@/components/modules/Home/FeaturedCard";
import { Button } from "@/components/shared/Button";
import { Modal } from "@/components/shared/Modal";
import { useState } from "react";
import { demoEvents } from "../../../../../../test";
import { EventForm } from "@/components/modules/Dashboard/Event/EventForm";
 
// ------------------------
// EVENT DATA TYPE
// ------------------------
export interface EventData {
  id: string;
  title: string;
  description: string;
  bannerPhoto: string;
  dateTime: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  eventType: string;
  hostId: string;
  createdByEmail: string;
  isDeleted: boolean;
}

export default function Page() {
  // Convert imported demoEvents to typed array
  const [events, setEvents] = useState<EventData[]>(demoEvents);

  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  // ------------------------
  // FILTER LOGIC
  // ------------------------
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ------------------------
  // CREATE EVENT
  // ------------------------
  const handleCreateEvent = (data: Omit<EventData, "id">) => {
    const newEvent: EventData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };

    setEvents((prev) => [newEvent, ...prev]);
    setIsCreateModalOpen(false);
  };

  // ------------------------
  // UPDATE EVENT
  // ------------------------
  const handleUpdateEvent = (data: Omit<EventData, "id">) => {
    if (!editingEvent) return;

    const updatedList = events.map((e) =>
      e.id === editingEvent.id ? { ...e, ...data } : e
    );

    setEvents(updatedList);
    setEditingEvent(null);
  };

  // ------------------------
  // DELETE EVENT
  // ------------------------
  const handleDeleteEvent = () => {
    if (!deletingEventId) return;

    setEvents((prev) => prev.filter((e) => e.id !== deletingEventId));
    setDeletingEventId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search & Create */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-64"
            />

            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Create Event
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={setEditingEvent}
                onDelete={setDeletingEventId}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen || !!editingEvent}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingEvent(null);
        }}
        title={editingEvent ? "Edit Event" : "Create New Event"}
      >
        <EventForm
          initialData={editingEvent || undefined}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={() => {
            setIsCreateModalOpen(false);
            setEditingEvent(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!deletingEventId}
        onClose={() => setDeletingEventId(null)}
        title="Delete Event"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeletingEventId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete this event? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}
