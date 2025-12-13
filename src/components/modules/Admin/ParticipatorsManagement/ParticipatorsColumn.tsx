"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IParticipator } from "@/types/participator.type";
 
export const participatorsColumns: Column<IParticipator>[] = [
  {
    header: "Participator",
    accessor: (participator) => (
      <UserInfoCell
        name={participator.name}
        email={participator.email}
        photo={participator.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (participator) => (
      <div className="flex flex-col">
        <span className="text-sm">{participator.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (participator) => <StatusBadgeCell isDeleted={participator.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (participator) => <DateCell date={participator.createdAt} />,
    sortKey: "createdAt",
  },
];
