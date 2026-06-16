import { getApplicationByUser } from '@/lib/api/applications';
import { getUser } from '@/lib/core/session';
import React from 'react';
import AppliedJobTable from '../_components/AppliedJobTable';

const ApplicationsPage = async () => {
    const user = await getUser();
    console.log("appliedJobs user.....", user);
    const appliedJobs = await getApplicationByUser(user?.id);
    console.log("appliedJobs....", appliedJobs);
    return (
        <div>

            <AppliedJobTable appliedJobs={appliedJobs.data} />
        </div>
    );
};

export default ApplicationsPage;