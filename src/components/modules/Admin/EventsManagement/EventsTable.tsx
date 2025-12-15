"use client";

 
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementCardGrid from "./EventCard";
import { eventsColumns } from "./EventsColumn";
import EventFormDialog from "./EventsFormDialog";
import { IEvent } from "@/types/event.type";
import { softDeleteEvent } from "@/services/admin/eventsManagement";
import EventViewDetailDialog from "./EventViewDetailDialog";

interface EventsTableProps {
  events: IEvent[];
}

const EventsTable = ({ events }: EventsTableProps) => {
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

  const handleView = (event: IEvent) => {
    setViewingEvent(event);
  };

  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
  };

  const handleDelete = (event: IEvent) => {
    setDeletingEvent(event);
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeleting(true);
    const result = await softDeleteEvent(deletingEvent.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Event deleted successfully");
      setDeletingEvent(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete event");
    }
  };

  return (
    <>
    <ManagementCardGrid
  data={events}
  columns={eventsColumns} // kept for API compatibility
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  getRowKey={(event) => event.id}
  emptyMessage="No events found"
/>
      {/* <ManagementTable
        data={events}
        columns={eventsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(event) => event.id!}
        emptyMessage="No events found"
      /> */}

      {/* Edit Event Form Dialog */}
      <EventFormDialog
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent!}
        onSuccess={() => {
          setEditingEvent(null);
          handleRefresh();
        }}
      />

      {/* View Event Detail Dialog */}
      <EventViewDetailDialog
        open={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        event={viewingEvent}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingEvent?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default EventsTable;
