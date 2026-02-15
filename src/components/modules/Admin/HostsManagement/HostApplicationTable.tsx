"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { IHostApplication } from "@/types/host.type";
import type { HostApplicationStatus } from "@/types/user";

interface Props {
  data: IHostApplication[];
  onChangeStatus?: (
    id: string,
    action: "APPROVED" | "REJECTED",
    adminNote?: string
  ) => Promise<{ success: boolean; message?: string }>;
}
 
export default function HostApplicationTable({
  data,
  onChangeStatus,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAction = async (
    action:
      | ((
          id: string,
          action: "APPROVED" | "REJECTED",
          adminNote?: string
        ) => Promise<{ success: boolean; message?: string }>)
      | undefined,
    id: string,
    status: "APPROVED" | "REJECTED",
    fallbackMessage: string
  ) => {
    if (!action) return;
    setLoadingId(id);
    const result = await action(id, status);
    setLoadingId(null);

    if (result?.success) {
      toast.success(result.message || fallbackMessage);
      handleRefresh();
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  const renderStatus = (status: HostApplicationStatus) => {
    if (status === "APPROVED") return <Badge>Approved</Badge>;
    if (status === "REJECTED") return <Badge variant="destructive">Rejected</Badge>;
    return <Badge variant="outline">Pending</Badge>;
  };

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item?.participator?.name}
              </TableCell>

              <TableCell>{item?.participator?.email}</TableCell>

              <TableCell className="max-w-[320px] truncate">
                {item.message}
              </TableCell>

              <TableCell>{renderStatus(item.status)}</TableCell>

              <TableCell className="text-right space-x-2">
                {item.status === "PENDING" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleAction(
                          onChangeStatus,
                          item.id,
                          "APPROVED",
                          "Host application approved"
                        )
                      }
                      disabled={loadingId === item.id}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleAction(
                          onChangeStatus,
                          item.id,
                          "REJECTED",
                          "Host application rejected"
                        )
                      }
                      disabled={loadingId === item.id}
                    >
                      Reject
                    </Button>
                  </>
                )}
 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
