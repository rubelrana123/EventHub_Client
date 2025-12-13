export interface IParticipator {
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
