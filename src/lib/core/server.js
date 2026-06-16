
'use server'

import { getUserToken } from "./session";
import { redirect } from "next/dist/server/api-utils";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`);
    return res.json();
}

export const protectedFetch = async (path) => {

    const res = await fetch(`${baseurl}${path}`, {
        headers: await authHeader()
    });

    return res.json();
}




export const serverMutation = async (path, apiData, method = "POST") => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(apiData)
    });


    return handleStatusCode(res);
}

const handleStatusCode = (res) => {
    if (res.status === 401) {
        redirect('/signin')
    }
    if (res.status === 403) {
        redirect('/unauthorized')
    }
    return res.json();
}