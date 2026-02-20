import { Metadata } from "next";
import EventDetails from "@/components/modules/Event/EventDetails";
import { getEventDetailsById } from "@/services/event/event.service";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const result = await getEventDetailsById(id);
        const event = result.data;

        if (!event) {
            return {
                title: "Event Not Found | Eventora",
                description: "The event you're looking for could not be found.",
            };
        }

        const eventDate = new Date(event.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        return {
            title: `${event.name} - ${event.type} Event | Eventora`,
            description: `${event.description?.substring(0, 155) || `Join ${event.name} on ${eventDate} at ${event.location}. Book your tickets now!`}`,
            keywords: [event.name, event.type, event.location, "event", "tickets", "book event"],
            openGraph: {
                title: `${event.name} | Eventora`,
                description: event.description || `Join ${event.name} on ${eventDate}`,
                type: "website",
                url: `https://eventora.com/events/${id}`,
                images: event.image ? [
                    {
                        url: event.image,
                        width: 1200,
                        height: 630,
                        alt: event.name,
                    },
                ] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: `${event.name} | Eventora`,
                description: event.description?.substring(0, 155) || `Join ${event.name} on ${eventDate}`,
                images: event.image ? [event.image] : [],
            },
        };
    } catch (error) {
        return {
            title: "Event Details | Eventora",
            description: "View event details and book your tickets on Eventora.",
        };
    }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const result = await getEventDetailsById(id);

    return <EventDetails event={result.data} />;
}
