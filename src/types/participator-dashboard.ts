export interface ParticipatorDashboardEvent {
  participationId: string;
  eventId: string;
  title: string;
  location: string;
  eventType: string;
  eventStatus: string;
  eventDateTime: string;
  joinedAt: string;
  isBooked: boolean;
  paymentStatus: string;
  amount: number;
  ticketQuantity: number;
}

export interface ParticipatorDashboardSummary {
  totalJoined: number;
  activeEvents: number;
  completedEvents: number;
  paidEvents: number;
  totalSpent: number;
}

export interface ParticipatorDashboardProfile {
  name: string;
  email: string;
  address?: string | null;
  interests?: string | null;
  bio?: string | null;
}

export interface ParticipatorDashboardData {
  profile: ParticipatorDashboardProfile;
  summary: ParticipatorDashboardSummary;
  allEvents: ParticipatorDashboardEvent[];
  activeEventsList: ParticipatorDashboardEvent[];
  historyEvents: ParticipatorDashboardEvent[];
}
