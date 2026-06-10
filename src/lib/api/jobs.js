import { serverFetch } from "../core/server";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyJobs = async (companyID) => {
    const res = await fetch(`${baseurl}/api/jobs?companyID=${companyID}&status=active`);
    return res.json();
}

export const getAllJobs = async () => {
    return serverFetch(`/api/jobs`);
}

export const getJobsById = async (id) => {
    return serverFetch(`/api/jobs/${id}`);
}

