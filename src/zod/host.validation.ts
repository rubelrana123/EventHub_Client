 
import { updateHost } from "@/services/admin/hostsManagement";
import { z } from "zod";

const createHostZodSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Invalid email format"),

    name: z.string({ error: "Name is required" }),

    profilePhoto: z.string({ error: "Profile photo is required" }),

    contactNumber: z.string({ error: "Contact number is required" }),

    address: z.string({ error: "Address is required" }),

    bio: z.string({ error: "Bio is required" }),

    experience: z
      .number({ error: "Experience is required" })
      .min(0, "Experience cannot be negative"),

    gender: z.enum(["MALE", "FEMALE", "OTHER"], { error: "Gender is required" }),

    nationalId: z.string({ error: "National ID is required" }),

    supportingDocuments: z.array(z.string()).default([]), // optional but accepted

    registrationStatus: z
      .enum(["PENDING", "APPROVED", "REJECTED"])
      .default("PENDING"),
  }),
});

const updateHostZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    experience: z.number().min(0).optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    nationalId: z.string().optional(),

    supportingDocuments: z.array(z.string()).optional(),

    registrationStatus: z
      .enum(["PENDING", "APPROVED", "REJECTED"])
      .optional(),
  }),
});

export const HostValidation = {
  createHostZodSchema,
  updateHostZodSchema,
};
 