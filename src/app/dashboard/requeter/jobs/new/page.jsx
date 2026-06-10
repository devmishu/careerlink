import React from 'react';
import PostJobForm from '../_components/PostJobForm';
import { getUser } from '@/lib/core/session';
import { getCompany } from '@/lib/api/companies';




const PostJobPage = async () => {

    const user = await getUser();
    console.log("company user...", user);


    const company = await getCompany(user?.id);

    console.log("jobs cpmpany......", company.data);

    return <PostJobForm company={company?.data} />
};

export default PostJobPage;