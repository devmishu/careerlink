import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJobsForm from '../../_components/ApplyJobsForm';
import { getJobsById } from '@/lib/api/jobs';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUser();

    const job = await getJobsById(id);

    console.log("apply job", job);

    if (!user) {
        redirect(`/signin?redirect=/browsejobs/${id}/apply`);
    }

    if (user.role === 'requeter') {
        return (
            <div>
                <h1 className='text-xl font-bold'>Only job seeker can apply Job....</h1>
            </div>
        )
    }



    console.log("userapply...", user);
    return (

        <ApplyJobsForm applicant={user} job={job.data} />
    );
};

export default ApplyPage;