

import { RoleCard } from "@/components/role-card/RoleCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardStats from "../_components/DashboardStats";
import { FileText, Building2, Users, CheckCircle2 } from "lucide-react";

const RequeterDashboardPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    console.log("RequeterDashboardPage", user);


    const statsData = [
        {
            id: 1,
            title: "Total Job Posts",
            value: "50K",
            icon: <FileText size={20} />,
        },
        {
            id: 2,
            title: "Companies",
            value: "12K",
            icon: <Building2 size={20} />,
        },
        {
            id: 3,
            title: "Job Seekers",
            value: "2M",
            icon: <Users size={20} />,
        },
        {
            id: 4,
            title: "Satisfaction Rate",
            value: "97%",
            icon: <CheckCircle2 size={20} />,
        }
    ];

    return (
        <div>
            <h1 className='my-4 font-semibold text-3xl' > Welcome back, {user?.name}</h1>
            <DashboardStats stats={statsData} />


        </div>
    );
};

export default RequeterDashboardPage;