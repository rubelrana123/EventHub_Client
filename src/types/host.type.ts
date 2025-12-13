import { IEvent } from "./event.type";
import { HostApplicationStatus, UserInfo } from "./user";

export interface IHost {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  address: string;
  averageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  user: UserInfo;
  events: IEvent[];
}
export interface IHostApplication {
  id: string;
  userId: string;
  participatorId: string;
  adminEmail?: string | null;
  status: HostApplicationStatus;
  message?: string | null;
  adminNote?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
