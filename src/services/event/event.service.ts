"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getAllEvents(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/event${queryString ? `?${queryString}` : ""}`
    );
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch events",
      data: [],
      meta: { page: 1, limit: 10, total: 0 },
    };
  }
}

export async function getEventDetailsById(id: string) {
  try {
    const response = await serverFetch.get(`/event/${id}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch event",
      data: null,
    };
  }
}
