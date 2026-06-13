import { serverFetch } from "../core/server";




export const getCompany = async (requeterId) => {
    return serverFetch(`/api/companis?requeterId=${requeterId}`);
}
