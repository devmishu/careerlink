import { protectedFetch } from "../core/server";




export const getCompany = async (requeterId) => {
    return protectedFetch(`/api/my/companis?requeterId=${requeterId}`);
}

export const getCompanies = async () => {
    return protectedFetch(`/api/companies`);
}
