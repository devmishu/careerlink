
const baseurl = process.env.NEXT_PUBLIC_BASE_URL 

export const getCompany = async (requeterId ) => {
    const res = await fetch(`${baseurl}/api/companis?requeterId=${requeterId}`);
    return res.json(); 
}