"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { applyForHost } from "@/services/host/hostsManagement";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const ApplyForHostForm = () => {
  const [state, formAction, isPending] = useActionState(applyForHost, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast.success(
        state.message || "Your host application has been submitted successfully."
      );
      formRef.current?.reset();
      return;
    }

    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="message">Why do you want to become a host?</FieldLabel>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Share your experience, event ideas, and why attendees should join your events."
          defaultValue={state?.formData?.message ?? ""}
          disabled={isPending}
        />
        {state?.errors?.find((error: { field: string }) => error.field === "message") && (
          <p className="text-sm text-red-500">
            {
              state.errors.find((error: { field: string }) => error.field === "message")
                ?.message
            }
          </p>
        )}
      </Field>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
};

export default ApplyForHostForm;
