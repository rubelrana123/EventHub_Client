import CreateEventForm from "@/components/modules/Host/EventsManagement/CreateEventForm";

const HostCreateEventPage = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Create Event</h1>
        <p className="text-sm text-muted-foreground">
          Publish a new event for your audience with schedule, seats, and fee.
        </p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <CreateEventForm />
      </section>
    </div>
  );
};

export default HostCreateEventPage;
