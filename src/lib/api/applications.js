

import { protectedFetch } from "../core/server";




export const getApplicationByUser = async (applicantId) => {
    return protectedFetch(`/api/applications?applicantId=${applicantId}`);
}


