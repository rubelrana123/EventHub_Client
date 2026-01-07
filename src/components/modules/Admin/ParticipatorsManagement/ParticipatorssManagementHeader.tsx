"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
 
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ParticipatorUpdateDialog from "./ParticipatorsFormDialog";

const ParticipatorsManagementHeader = () => {
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
      <ParticipatorUpdateDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess} participator={null}      />

      <ManagementPageHeader
        title="Participators Management"
        description="Manage participator accounts and permissions"
        action={{
          label: "Add Participator",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default ParticipatorsManagementHeader;
