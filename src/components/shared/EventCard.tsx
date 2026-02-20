 
import { IEvent } from "@/types/event.type";
import { UserRole } from "@/types/user";
import EventCardClient from "./EventCardClient";

interface IEventApiResponse {
    data: {
        data: IEvent[];
    };
}

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    profileImage?: string | null;
}

interface EventCardProps {
    events: IEventApiResponse;
    currentUser?: ICurrentUser;
    token?: string | null;
}

export default function EventCard({ events, currentUser, token }: EventCardProps) {
    return <EventCardClient events={events} currentUser={currentUser} token={token} />;
}
