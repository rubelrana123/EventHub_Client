import { IEvent } from "./event.type";
import { HostApplicationStatus, IAdmin, UserInfo, UserRole, UserStatus } from "./user";

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

  user?: IHostApplicationUser;
  admin?: IAdmin | null;
  participator?: IHostApplicationParticipator;
}

export interface IHostApplicationUser {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IHostApplicationParticipator {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string | null;
  address?: string | null;
  contactNumber?: string | null;
  interests?: string | null;
  bio?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
