import { IHost } from "./host.type";
import { IParticipator } from "./participator.type";

export type UserRole = "PARTICIPATOR" | "HOST" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export type Gender = "MALE" | "FEMALE";

export type HostApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type EventStatus = "UPCOMING" | "REGISTRATION_CLOSED" | "LIVE" | "COMPLETED";

export type PaymentStatus = "PAID" | "UNPAID" | "FAILED" | "SUCCESS";

export type PaymentMethod = "STRIPE" | "PAYPAL" | "SSL_COMMERZ";
export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

 
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  admin?: IAdmin;
  participator?: IParticipator;
  host?: IHost;
  createdAt: string;
  updatedAt: string;
}

 