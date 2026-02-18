"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EventFormDialog from "@/components/modules/Admin/EventsManagement/EventsFormDialog";

const HostEventsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  return (
    <>
      <EventFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="My Events"
        description="Create, update, and manage your hosted events"
        action={{
          label: "Add Event",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default HostEventsManagementHeader;
