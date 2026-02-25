"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IEvent } from "@/types/event.type";
 
import EventFormDialog from "@/components/modules/Admin/EventsManagement/EventsFormDialog";
import EventViewDetailDialog from "@/components/modules/Admin/EventsManagement/EventViewDetailDialog";
import ManagementCardGrid from "@/components/modules/Admin/EventsManagement/EventCard";
import { eventsColumns } from "@/components/modules/Admin/EventsManagement/EventsColumn";
import { softDeleteEvent } from "@/services/event/event.service";

interface HostEventsTableProps {
  events: IEvent[];
}

const HostEventsTable = ({ events }: HostEventsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingEvent, setDeletingEvent] = useState<IEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<IEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeleting(true);
    const result = await softDeleteEvent(deletingEvent.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Event deleted successfully");
      setDeletingEvent(null);
      handleRefresh();
      return;
    }

    toast.error(result.message || "Failed to delete event");
  };

  return (
    <>
      <ManagementCardGrid
        data={events}
        columns={eventsColumns}
        onView={(event) => setViewingEvent(event)}
        onEdit={(event) => setEditingEvent(event)}
        onDelete={(event) => setDeletingEvent(event)}
        getRowKey={(event) => event.id}
        emptyMessage="You have not created any events yet."
      />

      <EventFormDialog
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent || undefined}
        onSuccess={() => {
          setEditingEvent(null);
          handleRefresh();
        }}
      />

      <EventViewDetailDialog
        open={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        event={viewingEvent}
      />

      <DeleteConfirmationDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingEvent?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default HostEventsTable;
