import React from 'react';
import CompanyProfileManager from './_components/CompanyProfileManager';
import { getUser } from '@/lib/core/session';
import { getCompany } from '@/lib/api/companies';

const CompanyManagePage = async () => {

    const user = await getUser();
    console.log("company user...", user);


    const myCompany = await getCompany(user?.id);
    console.log("myCompany........", myCompany.data);

    return (
        <div>
            <CompanyProfileManager requeterId={user?.id} requeterCompany={myCompany.data}/>
        </div>
    );
};

export default CompanyManagePage;