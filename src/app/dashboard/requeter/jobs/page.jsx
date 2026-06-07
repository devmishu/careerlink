import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import JobsTable from './_components/JobsTable';

const ManageAllJobsPage = async () => {
    const jobs = await getCompanyJobs();
    console.log("getCompanyJobs:", jobs);

    return (
        <div>
            <h1 className='my-10 '>All Jobs</h1>

            <JobsTable jobs={jobs.data} />

        </div>
    );
};

export default ManageAllJobsPage; 