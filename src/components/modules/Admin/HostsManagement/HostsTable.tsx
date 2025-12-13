"use client";

 
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteHost } from "@/services/admin/hostsManagement";
 
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { hostsColumns } from "./HostsColumn";
import HostFormDialog from "./HostsFormDialog";
import HostViewDetailDialog from "./HostsViewDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IHost } from "@/types/host.type";
 
interface HostsTableProps {
  hosts: IHost[];
}

const HostsTable = ({ hosts }: HostsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingHost, setDeletingHost] = useState<IHost | null>(null);
  const [viewingHost, setViewingHost] = useState<IHost | null>(null);
  const [editingHost, setEditingHost] = useState<IHost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (host: IHost) => {
    setViewingHost(host);
  };

  const handleEdit = (host: IHost) => {
    setEditingHost(host);
  };

  const handleDelete = (host: IHost) => {
    setDeletingHost(host);
  };

  const confirmDelete = async () => {
    if (!deletingHost) return;

    setIsDeleting(true);
    const result = await softDeleteHost(deletingHost.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Host deleted successfully");
      setDeletingHost(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete host");
    }
  };

  return (
    <>
      <ManagementTable
        data={hosts}
        columns={hostsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(host) => host.id!}
        emptyMessage="No hosts found"
      />

      {/* Edit Host Form Dialog */}
      <HostFormDialog
        open={!!editingHost}
        onClose={() => setEditingHost(null)}
        host={editingHost!}
        onSuccess={() => {
          setEditingHost(null);
          handleRefresh();
        }}
      />

      {/* View Host Detail Dialog */}
      <HostViewDetailDialog
        open={!!viewingHost}
        onClose={() => setViewingHost(null)}
        host={viewingHost}  
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingHost}
        onOpenChange={(open) => !open && setDeletingHost(null)}
        onConfirm={confirmDelete}
        title="Delete Host"
        description={`Are you sure you want to delete ${deletingHost?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default HostsTable;
