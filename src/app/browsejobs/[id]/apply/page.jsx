import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJobsForm from '../../_components/ApplyJobsForm';
import { getJobsById } from '@/lib/api/jobs';
import { getApplicationByUser } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plan';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUser();

    if (!user) {
        redirect(`/signin?redirect=/browsejobs/${id}/apply`);
    }

    if (user.role === 'requeter') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 transition-colors">
                <div className="max-w-md w-full bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/50 rounded-2xl p-6 text-center shadow-sm">
                    <div className="w-12 h-12 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-red-900 dark:text-red-200 mb-2">Access Denied</h1>
                    <p className="text-sm text-red-700 dark:text-red-400">Only job seekers are permitted to apply for positions.</p>
                </div>
            </div>
        );
    }

    const job = await getJobsById(id);
    const applications = await getApplicationByUser(user?.id);

    const subPlan = await getPlanById(user?.plan || 'seeker-free');
    // const subPlan = await getPlanById('seeker-pro');

    const plan = subPlan.data;
    console.log("plan.....", plan);


    const currentCount = applications?.data?.length || 0;
    const maxCount = plan.maxApplicationPerMonth;
    const hasRemainingApplications = currentCount < maxCount;
    const usagePercentage = Math.min((currentCount / maxCount) * 10, 10) * 10;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 transition-colors">
            <div className="max-w-2xl mx-auto px-4">

                {/* Header section with job context */}
                <div className="mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 px-3 py-1 rounded-full">
                        Application Process
                    </span>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-3 tracking-tight">
                        Apply for {job?.data?.title || 'this position'}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Review your limits and complete the form below.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden mb-8">

                    {/* Usage Card Header */}
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Current Tier</p>
                                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{plan.name}</h3>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{currentCount}</span>
                                <span className="text-zinc-400 dark:text-zinc-500 font-medium"> / {maxCount} monthly applications used</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full mt-4 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ease-out ${usagePercentage >= 100 ? 'bg-amber-500' : 'bg-indigo-600 dark:bg-indigo-500'
                                    }`}
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Conditional Form Rendering or Limit Alert */}
                    <div className="p-6">
                        {hasRemainingApplications ? (
                            <div>
                                <ApplyJobsForm applicant={user} job={job.data} />
                            </div>
                        ) : (
                            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 text-center">
                                <div className="w-10 h-10 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <h4 className="text-base font-semibold text-amber-900 dark:text-amber-200 mb-1">Monthly limit reached</h4>
                                <p className="text-sm text-amber-700 dark:text-amber-400 mb-4 max-w-md mx-auto">
                                    You have used all available applications for your current free tier. Upgrade your account to apply for more positions.
                                </p>
                                <Link
                                    href="/plans"
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors rounded-lg shadow-sm"
                                >
                                    Upgrade Plan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Helper CTA Link if they haven't hit the limit but want to see options */}
                {hasRemainingApplications && (
                    <div className="text-center">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Want unlimited job applications?{' '}
                            <Link href="/plan" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline font-medium">
                                View Premium Plans
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplyPage;