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
  reviews: unknown[];
  eventParticipations: {
    id: string;
    joinedAt: string;
    isBooked: boolean;
    paymentId: string;
    event: {
      id: string;
      title: string;
      dateTime: string;
      location: string;
      eventType: string;
      status: string;
      joiningFee: number;
      minParticipants: number;
      maxParticipants: number;
      availableSeats: number;
    };
  }[];
}
