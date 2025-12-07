export type UserRole = "ADMIN" | "HOST" | "PARTICIPATOR";

export interface IAdmin {
    id?: string;
    email: string;
    name: string;
    profilePhoto?: string | null;
    contactNumber: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IParticipator {
  id?: string;
  email: string;
  name: string;
  profilePhoto?: string | null;
  address?: string | null;
  interests?: string | null;
  bio?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IHost {
  id?: string;
  email: string;
  name: string;
  profilePhoto?: string | null;
  contactNumber: string;
  address: string;
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

 