
'use server'

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`);
    return res.json();
}

export const serverMutation = async (path, apiData) => {
    const res = await fetch(`${baseurl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}