import React from 'react';
import { DashboardSideBar } from './_components/DashboardSideBar';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex gap-5 min-h-screen'>
            <DashboardSideBar  />
            <div className='flex-1'>{children}</div> 
        </div>
    );
};

export default DashboardLayout;