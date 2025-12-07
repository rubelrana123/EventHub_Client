/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

 
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/serverFetch";
import { UserInfo } from "@/types/user";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            // cache: "force-cache",
            // next: { tags: ["user-info"] }
        })

        const result = await response.json();
      console.log("user info from", response)
        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
console.log(verifiedToken, "user verify token")
            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.participator?.name || result.data.host?.name || result.data.name || "Unknown User",
            ...result.data
        };

  console.log(userInfo, "userInfo here")

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "PARTICIPATOR",
        };
    }

}