import { z } from "zod";

// ===================================================
// CREATE EVENT
// ===================================================
export const eventCreationSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(5, "Title must be at least 5 characters"),

  description: z
    .string({ error: "Description is required" })
    .min(20, "Description must be at least 20 characters"),

  dateTime: z.string({ error: "Date & time is required" }),

  location: z
    .string({ error: "Location is required" })
    .min(3, "Location must be at least 3 characters"),

  eventType: z
    .string({ error: "Event type is required" })
    .min(1, "Event type is required"),

  // Participants
  minParticipants: z
    .number({ error: "Minimum participants must be a number" })
    .int()
    .min(0, "Minimum participants cannot be negative")
    .optional(),

  maxParticipants: z
    .number({ error: "Maximum participants must be a number" })
    .int()
    .min(1, "Maximum participants must be at least 1")
    .optional(),

  // Joining Fee
  joiningFee: z
    .number({ error: "Joining fee must be a number" })
    .int()
    .min(0, "Joining fee cannot be negative"),

  // Banner photo is optional
  bannerPhoto: z.string().optional(),
});

// ===================================================
// UPDATE EVENT
// ===================================================
export const eventUpdateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    bannerPhoto: z.string().optional(),

    dateTime: z.string().optional(),
    location: z.string().optional(),
    eventType: z.string().optional(),

    minParticipants: z.number().int().min(0).optional(),
    maxParticipants: z.number().int().min(1).optional(),
    joiningFee: z.number().int().min(0).optional(),
  }),
});

export type EventCreationFormValues = z.infer<typeof eventCreationSchema>;
