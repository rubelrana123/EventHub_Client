import { z } from "zod";

/* =======================
   CREATE PARTICIPATOR
======================= */

const createParticipator = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),

  profilePhoto: z
    .string()
    .url("Profile photo must be a valid URL")
    .optional(),

  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .optional(),

  contactNumber: z
    .string()
    .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional(),

  interests: z
    .string()
    .max(255, "Interests cannot exceed 255 characters")
    .optional(),

  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),
});
const updateParticipator = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100)
      .optional(),

    profilePhoto: z
      .string()
      .url("Profile photo must be a valid URL")
      .optional(),

    address: z
      .string()
      .min(3)
      .optional(),

    contactNumber: z
      .string()
      .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional(),

    interests: z
      .string()
      .max(255)
      .optional(),

    bio: z
      .string()
      .max(500)
      .optional(),
  }),
});
export const ParticipatorValidation = {
  createParticipator,
  updateParticipator,
};