import { getEventById } from "@/services/admin/eventsManagement";
import EventDetailsPage from "@/components/modules/Event/EventDetails";
interface PageProps {
  params: {
    id: string;
  };
}

export default async function  page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
  const event = await getEventById(id);
 console.log(params, event , "check params and event");
  if (!event) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Event not found!
      </div>
    );
  }

  return <EventDetailsPage event={event?.data} />;
}
