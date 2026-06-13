

import { serverFetch } from "../core/server";




export const getApplicationByUser = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
}


