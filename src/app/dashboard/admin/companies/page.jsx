import { getCompanies } from "@/lib/api/companies";
import AdminCompaniesTable from "../_components/AdminCompaniesTable";

const AdminCompanisPage = async () => {
    const companies = await getCompanies();

    return <AdminCompaniesTable companies={companies?.data} />
};

export default AdminCompanisPage; 