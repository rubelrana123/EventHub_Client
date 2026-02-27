"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
  onSuccess: () => void;
  editMode?: boolean;
  reviewId?: string;
  initialRating?: number;
  initialComment?: string;
  token: string | null;
}

export default function ReviewModal({
  isOpen,
  onClose,
  eventId,
  eventName,
  onSuccess,
  editMode = false,
  reviewId,
  initialRating = 0,
  initialComment = "",
  token,
}: ReviewModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formKey = useMemo(
    () => `${editMode ? reviewId || "edit" : "create"}-${isOpen ? "open" : "closed"}`,
    [editMode, reviewId, isOpen]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const rating = Number(formData.get("rating"));
    const comment = String(formData.get("comment") || "").trim();

    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5.");
      return;
    }

    setIsSubmitting(true);

    try {
      const url =
        editMode && reviewId
          ? `${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/review`;

      const method = editMode && reviewId ? "PATCH" : "POST";
      const body =
        editMode && reviewId
          ? { rating, comment }
          : { eventId, rating, comment };

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: token } : {}),
        },
        body: JSON.stringify(body),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(result?.message || "Failed to submit review.");
        return;
      }

      toast.success(
        editMode ? "Review updated successfully!" : "Review submitted successfully!"
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Review submit error:", error);
      toast.error("An error occurred while submitting the review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Review" : "Write a Review"}
          </DialogTitle>
        </DialogHeader>

        <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel className="mb-2 block">
              Event: <span className="font-medium">{eventName}</span>
            </FieldLabel>
          </Field>

          <Field>
            <FieldLabel className="mb-2 block">Rating</FieldLabel>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    className="sr-only peer"
                    defaultChecked={Math.round(initialRating) === value}
                  />
                  <Star className="h-7 w-7 text-gray-300 peer-checked:fill-yellow-400 peer-checked:text-yellow-400" />
                </label>
              ))}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="review-comment">Comment</FieldLabel>
            <Textarea
              id="review-comment"
              name="comment"
              rows={4}
              placeholder="Share your experience..."
              defaultValue={initialComment}
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? editMode
                  ? "Updating..."
                  : "Submitting..."
                : editMode
                ? "Update Review"
                : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
