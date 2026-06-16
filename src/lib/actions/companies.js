"use server"

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companis', newCompanyData);
}

export const updateCompany = async (id, data) => {
    revalidatePath('/dashboard/admin/companies')
    return serverMutation(`/api/companis/${id}`, data, "PATCH");
}