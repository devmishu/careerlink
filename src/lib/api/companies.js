import { serverFetch } from "../core/server";




export const getCompany = async (requeterId) => {
    return serverFetch(`/api/my/companis?requeterId=${requeterId}`);
}

export const getCompanies = async () => {
    return serverFetch(`/api/companies`);
}
