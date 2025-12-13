"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IHost } from "@/types/host.type";
 
export const hostsColumns: Column<IHost>[] = [
  {
    header: "Host",
    accessor: (host) => (
      <UserInfoCell
        name={host.name}
        email={host.email}
        photo={host.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (host) => (
      <div className="flex flex-col">
        <span className="text-sm">{host.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (host) => <StatusBadgeCell isDeleted={host.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (host) => <DateCell date={host.createdAt} />,
    sortKey: "createdAt",
  },
];
