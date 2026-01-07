"use client";

import { useState } from "react";
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

// ------------------
// Types
// ------------------
export type HostApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

interface IUser {
  id: string;
  email: string;
  role: string;
  status: string;
}

interface IParticipator {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
}

export interface IHostApplication {
  id: string;
  status: HostApplicationStatus;
  message: string;
  adminNote?: string | null;
  createdAt: string;
  user: IUser;
  participator: IParticipator;
}

interface Props {
  data: IHostApplication[];
  // onApprove: (id: string) => Promise<void>;
  // onReject: (id: string) => Promise<void>;
  // onDelete: (id: string) => Promise<void>;
}

// ------------------
// Component
// ------------------
export default function HostApplicationTable({
  data,
  // onApprove,
  // onReject,
  // onDelete,
}: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (
    action: () => Promise<void>,
    id: string
  ) => {
    try {
      setLoadingId(id);
      await action();
    } finally {
      setLoadingId(null);
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
                {item.participator.name}
              </TableCell>

              <TableCell>{item.participator.email}</TableCell>

              <TableCell className="max-w-[320px] truncate">
                {item.message}
              </TableCell>

              <TableCell>{renderStatus(item.status)}</TableCell>

              <TableCell className="text-right space-x-2">
                {item.status === "PENDING" && (
                  <>
                    <Button
                      size="sm"
                      // onClick={() =>
                      //   handleAction(() => onApprove(item.id), item.id)
                      // }
                      disabled={loadingId === item.id}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      // onClick={() =>
                      //   handleAction(() => onReject(item.id), item.id)
                      // }
                      disabled={loadingId === item.id}
                    >
                      Reject
                    </Button>
                  </>
                )}

                <Button
                  size="sm"
                  variant="destructive"
                  // onClick={() =>
                  //   handleAction(() => onDelete(item.id), item.id)
                  // }
                  disabled={loadingId === item.id}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
