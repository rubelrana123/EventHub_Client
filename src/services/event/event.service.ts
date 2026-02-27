/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { eventCreationSchema, eventUpdateSchema } from "@/zod/event.validation";

export async function createEvent(_prevState: any, formData: FormData) {
  const validationPayload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dateTime: formData.get("dateTime") as string,
    location: formData.get("location") as string,
    minParticipants: Number(formData.get("minParticipants")),
    maxParticipants: Number(formData.get("maxParticipants")),
    joiningFee: Number(formData.get("joiningFee")),
    eventType: formData.get("eventType") as string,
    bannerPhoto: formData.get("file") as File | null,
  };


  console.log(validationPayload, "validation payload");
  const validated = zodValidator(validationPayload, eventCreationSchema);

  if (!validated.success && validated.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validated.errors,
    };
  }

  if (!validated.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  const payload = new FormData();
  payload.append("data", JSON.stringify(validated.data));

  if (validationPayload.bannerPhoto) {
    payload.append("file", validationPayload.bannerPhoto);
  }
  console.log(payload, " with image payload");


  try {
    const response = await serverFetch.post("/event/create-event", {
      body: payload,
    });

    return await response.json();
  } catch (error: any) {
    console.error("Create event error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create event",
      formData: validationPayload,
    };
  }
}


export async function getEvents(queryString?: string) {
  console.log("inner get event")
  try {
    const response = await serverFetch.get(
      `/event${queryString ? `?${queryString}` : ""}`
    );
    console.log(response , "response event")
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

// Backward-compatible aliases for existing page imports
export const getAllEvents = getEvents;


  //  GET EVENT BY ID
  //  API: GET /event/:id

export async function getEventById(id: string) {
  try {
    const response = await serverFetch.get(`/event/${id}`);
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

// Backward-compatible alias for existing page imports
export const getEventDetailsById = getEventById;

/* ================================
   UPDATE EVENT
   API: PATCH /event/:id
================================ */
export async function updateEvent(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload = {
    title: formData.get("title") as string | undefined,
    description: formData.get("description") as string | undefined,
    dateTime: formData.get("dateTime") as string | undefined,
    location: formData.get("location") as string | undefined,
    minParticipants: formData.get("minParticipants")
      ? Number(formData.get("minParticipants"))
      : undefined,
    maxParticipants: formData.get("maxParticipants")
      ? Number(formData.get("maxParticipants"))
      : undefined,
    joiningFee: formData.get("joiningFee")
      ? Number(formData.get("joiningFee"))
      : undefined,
    eventType: formData.get("eventType") as string | undefined,
  };

  const validated = zodValidator(validationPayload, eventUpdateSchema);

  if (!validated.success && validated.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validated.errors,
    };
  }

  if (!validated.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.patch(`/event/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    return await response.json();
  } catch (error: any) {
    console.error("Update event error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update event",
      formData: validationPayload,
    };
  }
}

/* ================================
   SOFT DELETE EVENT
   API: DELETE /event/soft/:id
================================ */
export async function softDeleteEvent(id: string) {
  try {
    const response = await serverFetch.patch(`/event/soft/${id}`);
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/* ================================
   HARD DELETE EVENT
   API: DELETE /event/:id
================================ */
export async function deleteEvent(id: string) {
  try {
    const response = await serverFetch.delete(`/event/${id}`);
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
