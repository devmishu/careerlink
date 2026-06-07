
const baseurl = process.env.NEXT_PUBLIC_BASE_URL 

export const getCompanyJobs = async (companyID = "company123", status = "active") => {
    const res = await fetch(`${baseurl}/api/jobs?companyID=${companyID}&status=active`);
    return res.json(); 
}