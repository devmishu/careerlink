import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import JobsTable from './_components/JobsTable';
import { getCompany } from '@/lib/api/companies';
import { getUser } from '@/lib/core/session';

const ManageAllJobsPage = async () => {


    const user = await getUser();
    console.log("company user...", user);

    const company = await getCompany(user?.id);

    const jobs = await getCompanyJobs(company?.data?._id, "active");
    console.log("getCompanyJobs:", jobs);

    
    console.log("ManageAllJobsPage...",company);

    return (
        <div>
            <h1 className='my-10 '>All Jobs</h1>

            <JobsTable jobs={jobs.data} />

        </div>
    );
};

export default ManageAllJobsPage; 