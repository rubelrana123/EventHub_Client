/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/serverFetch";
import { registerParticipatorValidationZodSchema } from "@/zod/authValidation";


export const registerParticipator = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }
   console.log(payload, "form payload")
        if (zodValidator(payload, registerParticipatorValidationZodSchema).success === false) {
            return zodValidator(payload, registerParticipatorValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerParticipatorValidationZodSchema).data;
        console.log(validatedPayload, "validation payload")
        const registerData = {
            password: validatedPayload.password,
            participator: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-participator", {
            body: newFormData,
        })
            console.log(res, "response data res")
        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}