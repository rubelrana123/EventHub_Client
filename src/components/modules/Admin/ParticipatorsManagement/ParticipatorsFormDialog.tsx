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
import { updateParticipator } from "@/services/admin/participatorsManagement";
import { IParticipator } from "@/types/participator.type";

import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IParticipatorUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  participator: IParticipator | null;
}

const ParticipatorUpdateDialog = ({
  open,
  onClose,
  onSuccess,
  participator,
}: IParticipatorUpdateDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    updateParticipator.bind(null, participator?.id as string),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Participator updated successfully");
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onClose, onSuccess]);

  if (!participator) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Participator</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={state?.formData?.name ?? participator.name}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Email (read-only) */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                value={participator.email}
                disabled
              />
            </Field>

            {/* Contact Number */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="017XXXXXXXX"
                defaultValue={
                  state?.formData?.contactNumber ??
                  participator.contactNumber ??
                  ""
                }
              />
              <InputFieldError field="contactNumber" state={state} />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="Dinajpur, Bangladesh"
                defaultValue={
                  state?.formData?.address ??
                  participator.address ??
                  ""
                }
              />
              <InputFieldError field="address" state={state} />
            </Field>

            {/* Interests */}
            <Field>
              <FieldLabel htmlFor="interests">Interests</FieldLabel>
              <Input
                id="interests"
                name="interests"
                placeholder="Music, Sports"
                defaultValue={
                  state?.formData?.interests ??
                  participator.interests ??
                  ""
                }
              />
              <InputFieldError field="interests" state={state} />
            </Field>

            {/* Bio */}
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Short bio about the participator"
                defaultValue={
                  state?.formData?.bio ??
                  participator.bio ??
                  ""
                }
              />
              <InputFieldError field="bio" state={state} />
            </Field>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Participator"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipatorUpdateDialog;
