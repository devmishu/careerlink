"use server"

import { headers } from "next/headers";
import { auth } from "../auth";

export const updateUserRole = async (userId, role) => {
    // এখানে আপনার পাঠানো userId এবং role ডায়নামিকালি বসানো হয়েছে
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role.toLowerCase(), // এপিআই সাধারণত ছোট হাতের অক্ষরে রোল গ্রহণ করে
        },
        headers: await headers(),
    });
    return data;
}