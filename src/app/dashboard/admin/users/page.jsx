import { getUsersList } from '@/lib/api/users';
import React from 'react';
import { revalidatePath } from 'next/cache';
import AdminUsersTable from '../_components/AdminUsersTable';
import { updateUserRole } from '@/lib/actions/users';

const UsersListPage = async () => {
    const data = await getUsersList();
    const usersData = data?.users || [];
    console.log("usersData...............", usersData);

    // সার্ভার অ্যাকশন হ্যান্ডলারসমূহ (প্রয়োজন অনুযায়ী আপনার এপিআই লজিক লিখবেন)
    const handleRoleChange = async (userId, newRole) => {
        "use server"
        await updateUserRole(userId, newRole);
        revalidatePath('/admin/users');
    };



    const handleSuspend = async (userId) => {
        "use server";
        console.log(`Suspending user: ${userId}`);
        // await suspendUserApi(userId);
        revalidatePath('/admin/users');
    };

    const handleActivate = async (userId) => {
        "use server";
        console.log(`Activating user: ${userId}`);
        // await activateUserApi(userId);
        revalidatePath('/admin/users');
    };

    return (
        <div className="p-8 bg-[#0a0a0a] min-h-screen">
            <div className="mb-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
                <p className="text-neutral-400 text-sm">Manage roles, control access, and monitor status.</p>
            </div>

            <AdminUsersTable
                users={usersData}
                onRoleChange={handleRoleChange}
                onSuspend={handleSuspend}
                onActivate={handleActivate}
            />
        </div>
    );
};

export default UsersListPage;