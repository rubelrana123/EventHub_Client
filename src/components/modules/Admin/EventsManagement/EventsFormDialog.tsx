"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, updateEvent } from "@/services/admin/eventsManagement";
 
import { IEvent } from "@/types/event.type";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IEventFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event?: IEvent;
}

const EventFormDialog = ({
  open,
  onClose,
  onSuccess,
  event,
}: IEventFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!event?.id;

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateEvent.bind(null, event!.id) : createEvent,
    null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Event saved successfully");
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onClose, onSuccess]);

  const handleClose = () => {
    setSelectedFile(null);
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Event" : "Create Event"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Business Innovators Meetup"
                defaultValue={state?.formData?.title ?? event?.title ?? ""}
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={
                  state?.formData?.description ??
                  event?.description ??
                  ""
                }
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Date & Time */}
            <Field>
              <FieldLabel htmlFor="dateTime">Date & Time</FieldLabel>
              <Input
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                defaultValue={
                  state?.formData?.dateTime ??
                  (event?.dateTime
                    ? new Date(event.dateTime)
                        .toISOString()
                        .slice(0, 16)
                    : "")
                }
              />
              <InputFieldError field="dateTime" state={state} />
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="Banani, Dhaka"
                defaultValue={
                  state?.formData?.location ?? event?.location ?? ""
                }
              />
              <InputFieldError field="location" state={state} />
            </Field>

            {/* Participants */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="minParticipants">
                  Min Participants
                </FieldLabel>
                <Input
                  id="minParticipants"
                  name="minParticipants"
                  type="number"
                  defaultValue={
                    state?.formData?.minParticipants ??
                    event?.minParticipants ??
                    ""
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="maxParticipants">
                  Max Participants
                </FieldLabel>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  defaultValue={
                    state?.formData?.maxParticipants ??
                    event?.maxParticipants ??
                    ""
                  }
                />
              </Field>
            </div>

            {/* Joining Fee */}
            <Field>
              <FieldLabel htmlFor="joiningFee">Joining Fee</FieldLabel>
              <Input
                id="joiningFee"
                name="joiningFee"
                type="number"
                defaultValue={
                  state?.formData?.joiningFee ??
                  event?.joiningFee ??
                  ""
                }
              />
              <InputFieldError field="joiningFee" state={state} />
            </Field>

            {/* Event Type */}
            <Field>
              <FieldLabel htmlFor="eventType">Event Type</FieldLabel>
              <Input
                id="eventType"
                name="eventType"
                placeholder="Tech / Business"
                defaultValue={
                  state?.formData?.eventType ?? event?.eventType ?? ""
                }
              />
              <InputFieldError field="eventType" state={state} />
            </Field>

            {/* Banner Photo (Create Only) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Banner Photo</FieldLabel>

                {selectedFile && (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    width={200}
                    height={120}
                    className="rounded mb-2"
                  />
                )}

                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Field>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
