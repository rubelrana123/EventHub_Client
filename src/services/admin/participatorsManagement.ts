/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

 
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ParticipatorValidation } from "@/zod/participator.validation";
/**
 * CREATE ADMIN
 * API: POST /user/create-participator
 */
export async function createParticipator(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        contactNumber: formData.get("contactNumber") as string,
        password: formData.get("password") as string,
        profilePhoto: formData.get("file") as File,
    };

    const validatedPayload = zodValidator(validationPayload, ParticipatorValidation.createParticipator);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }
    const backendPayload = {
        password: validatedPayload.data.password,
        participator: {
            name: validatedPayload.data.name,
            email: validatedPayload.data.email,
            contactNumber: validatedPayload.data.contactNumber,
            password: validatedPayload.data.password,
        }
    };
    const newFormData = new FormData()
    newFormData.append("data", JSON.stringify(backendPayload))
    newFormData.append("file", formData.get("file") as Blob)
    try {


        const response = await serverFetch.post("/user/create-participator", {
            body: newFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create participator error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create participator',
            formData: validationPayload
        };
    }
}

/**
 * GET ALL ADMINS
 * API: GET /participator?queryParams
 */
export async function getParticipators(queryString?: string) {
    try {
        const response = await serverFetch.get(`/participator${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * GET ADMIN BY ID
 * API: GET /participator/:id
 */
export async function getParticipatorById(id: string) {
    try {
        const response = await serverFetch.get(`/participator/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * UPDATE ADMIN
 * API: PATCH /participator/:id
 */
export async function updateParticipator(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
    };

    /*
    // Server-side validation
        const validation = updateParticipatorZodSchema.safeParse(validationPayload);
        if (!validation.success) {
            const errors = validation.error.issues.map((err: any) => ({
                field: err.path[0] as string,
                message: err.message,
            }));
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
                errors,
            };
        }
    */

    const validation = zodValidator(validationPayload, ParticipatorValidation.updateParticipator);
    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }
    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.patch(`/participator/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update participator error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update participator',
            formData: validationPayload
        };
    }
}

/**
 * SOFT DELETE ADMIN
 * API: DELETE /participator/soft/:id
 */
export async function softDeleteParticipator(id: string) {
    try {
        const response = await serverFetch.delete(`/participator/soft/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * HARD DELETE ADMIN
 * API: DELETE /participator/:id
 */
export async function deleteParticipator(id: string) {
    try {
        const response = await serverFetch.delete(`/participator/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
