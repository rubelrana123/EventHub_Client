"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EventFormDialog from "./EventsFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

const EventsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <EventFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Events Management"
        description="Manage event accounts and permissions"
        action={{
          label: "Add Event",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default EventsManagementHeader;
