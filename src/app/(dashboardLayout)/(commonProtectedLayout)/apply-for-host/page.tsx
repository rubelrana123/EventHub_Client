import ApplyForHostForm from "@/components/modules/Participator/ApplyForHostForm";

export const dynamic = "force-dynamic";

const ApplyForHostPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Apply For Host</h1>
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
        <p className="mb-6 text-sm text-muted-foreground">
          Submit your request to become a host. Our team will review your
          application and notify you after approval.
        </p>
        <ApplyForHostForm />
      </div>
    </div>
  );
};

export default ApplyForHostPage;
