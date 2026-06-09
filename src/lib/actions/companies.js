"use server"

import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companis', newCompanyData);
}