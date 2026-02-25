"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEvent } from "@/services/event/event.service";
 
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CreateEventForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createEvent, null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Event created successfully");
      router.push("/host/dashboard/events-management");
      router.refresh();
      return;
    }

    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [router, state]);

  const handleReset = () => {
    setSelectedFile(null);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field className="md:col-span-2">
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            placeholder="Business Innovators Meetup"
            defaultValue={state?.formData?.title ?? ""}
          />
          <InputFieldError field="title" state={state} />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={state?.formData?.description ?? ""}
          />
          <InputFieldError field="description" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="dateTime">Date & Time</FieldLabel>
          <Input
            id="dateTime"
            name="dateTime"
            type="datetime-local"
            defaultValue={state?.formData?.dateTime ?? ""}
          />
          <InputFieldError field="dateTime" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            name="location"
            placeholder="Banani, Dhaka"
            defaultValue={state?.formData?.location ?? ""}
          />
          <InputFieldError field="location" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="minParticipants">Min Participants</FieldLabel>
          <Input
            id="minParticipants"
            name="minParticipants"
            type="number"
            defaultValue={state?.formData?.minParticipants ?? ""}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="maxParticipants">Max Participants</FieldLabel>
          <Input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            defaultValue={state?.formData?.maxParticipants ?? ""}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="joiningFee">Joining Fee</FieldLabel>
          <Input
            id="joiningFee"
            name="joiningFee"
            type="number"
            defaultValue={state?.formData?.joiningFee ?? ""}
          />
          <InputFieldError field="joiningFee" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="eventType">Event Type</FieldLabel>
          <Input
            id="eventType"
            name="eventType"
            placeholder="Tech / Business"
            defaultValue={state?.formData?.eventType ?? ""}
          />
          <InputFieldError field="eventType" state={state} />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="file">Banner Photo</FieldLabel>
          {selectedFile && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              width={280}
              height={150}
              className="mb-2 rounded-md border object-cover"
            />
          )}
          <Input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isPending}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
