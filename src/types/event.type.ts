import { IHost } from "./host.type";
import { EventStatus, PaymentMethod, PaymentStatus } from "./user";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  bannerPhoto?: string | null;
  dateTime: string;
  location: string;

  minParticipants?: number | null;
  maxParticipants?: number | null;
  availableSeats?: number | null;

  joiningFee: number;
  eventType: string;
  status: EventStatus;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  hostId?: string | null;
  createdByEmail: string;

  host?: IHost;
  participators?: IEventParticipator[];
  reviews?: IReview[];
  payments?: IPayment[];
}


export interface IEventParticipator {
  id: string;
  eventId: string;
  userId: string;
  participatorId?: string | null;
  joinedAt: string;
  isBooked: boolean;
  paymentId?: string | null;
}


export interface IReview {
  id: string;
  rating: number;
  comment?: string | null;
  eventId: string;
  participatorId: string;
  userId?: string | null;
  createdAt: string;
}

export interface IPayment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method?: PaymentMethod | null;
  transactionId: string;
  eventParticipationId?: string | null;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}
