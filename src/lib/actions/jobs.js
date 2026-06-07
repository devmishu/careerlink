"use server"
const baseurl = process.env.NEXT_PUBLIC_BASE_URL

export const createJob = async (newJobData) => {
    const res = await fetch(`${baseurl}/api/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJobData)
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}