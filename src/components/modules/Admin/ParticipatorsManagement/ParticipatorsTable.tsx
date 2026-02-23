"use client";

 
import ManagementTable from "@/components/shared/ManagementTable";
 
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { participatorsColumns } from "./ParticipatorsColumn";
 
import ParticipatorViewDetailDialog from "./ParticipatorsViewDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IParticipator } from "@/types/participator.type";
import { softDeleteParticipator } from "@/services/admin/participatorsManagement";
 
interface ParticipatorsTableProps {
  participators: IParticipator[];
}

const ParticipatorsTable = ({ participators }: ParticipatorsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingParticipator, setDeletingParticipator] = useState<IParticipator | null>(null);
  const [viewingParticipator, setViewingParticipator] = useState<IParticipator | null>(null);
   
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (participator: IParticipator) => {
    setViewingParticipator(participator);
  };
 
  const handleDelete = (participator: IParticipator) => {
    setDeletingParticipator(participator);
  };

  const confirmDelete = async () => {
    if (!deletingParticipator) return;

    setIsDeleting(true);
    const result = await softDeleteParticipator(deletingParticipator.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Participator deleted successfully");
      setDeletingParticipator(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete participator");
    }
  };

  return (
    <>
      <ManagementTable
        data={participators}
        columns={participatorsColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(participator) => participator.id!}
        emptyMessage="No participators found"
      />
 
      {/* View Participator Detail Dialog */}
      <ParticipatorViewDetailDialog
        open={!!viewingParticipator}
        onClose={() => setViewingParticipator(null)}
        participator={viewingParticipator}  
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingParticipator}
        onOpenChange={(open) => !open && setDeletingParticipator(null)}
        onConfirm={confirmDelete}
        title="Delete Participator"
        description={`Are you sure you want to delete ${deletingParticipator?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ParticipatorsTable;
