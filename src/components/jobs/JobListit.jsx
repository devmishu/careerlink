// app/jobs/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Form, TextField, Label, Input } from "@heroui/react";
import { JobCard } from "./JobCard";
import { useRouter } from "next/navigation";
import { PaginationWithSummary } from "../common/PaginationWithSummary";

export default function JobListit({ jobsData, filters, total }) {
    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedLocation, setSelectedLocation] = useState(filters.jobLocation || "all");
    const [selectedJobType, setSelectedJobType] = useState(filters.jobType || "all");
    const [maxSalaryLimit, setMaxSalaryLimit] = useState("");
    const [page, setPage] = useState(1);


    // Filtering Logic
    // const jobsData? = jobsData?.filter((job) => {
    //     const matchesSearch = job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    //     const matchesLocation = selectedLocation === "" || job.jobLocation.toLowerCase() === selectedLocation.toLowerCase();
    //     const matchesJobType = selectedJobType === "" || job.jobType.toLowerCase() === selectedJobType.toLowerCase();
    //     const matchesSalary = maxSalaryLimit === "" || Number(job.maxSalary) <= Number(maxSalaryLimit);

    //     return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    // });

    const router = useRouter();


    useEffect(() => {
        const sp = new URLSearchParams();

        // যদ্রি ড্রপডাউনের ভ্যালু খালি ("") অথবা "all" না হয়, তাহলে URL-এ সেট করবে
        if (selectedJobType && selectedJobType !== 'all') {
            sp.set('jobType', selectedJobType);
        } else {
            // "All Types" বা "all" সিলেক্ট করলে URL থেকে jobType রিমুভ হয়ে যাবে
            sp.delete('jobType');
        }
        if (selectedLocation && selectedLocation !== 'all') {
            sp.set('jobLocation', selectedLocation);
        } else {
            // "All Types" বা "all" সিলেক্ট করলে URL থেকে jobType রিমুভ হয়ে যাবে
            sp.delete('jobLocation');
        }

        if (searchQuery) {
            sp.set('search', searchQuery);
        }

        if (page) {
            sp.set('page', page)
        }


        // নতুন সার্চ প্যারামস দিয়ে পাথ তৈরি করা হচ্ছে
        const searchString = sp.toString();
        const path = searchString ? `?${searchString}` : window.location.pathname;

        router.push(path);

    }, [selectedJobType, router, searchQuery, selectedLocation, page]);

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Explore Open Positions</h1>
                    <p className="text-neutral-400 mt-1">Find your next frontend role at Uber Bangladesh. {jobsData?.length}</p>
                </div>

                {/* Search & Filter Bar Section */}
                <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl">
                    <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end w-full">

                        {/* Search Input */}
                        <TextField className="w-full">
                            <Label className="text-neutral-300 text-xs font-semibold mb-1">Search Job Title</Label>
                            <Input
                                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl"
                                placeholder="e.g. React, Next.js..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </TextField>

                        {/* Filter by Location */}
                        <div className="flex flex-col w-full">
                            <label className="text-neutral-300 text-xs font-semibold mb-2">Location</label>
                            <select
                                className="w-full h-[40px] bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-xl px-3 text-sm focus:outline-none focus:border-neutral-700"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="all">All Districts</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barishal">Barishal</option>
                                <option value="Cox's Bazar">Cox's Bazar</option>
                            </select>
                        </div>

                        {/* Filter by Job Type */}
                        <div className="flex flex-col w-full">
                            <label className="text-neutral-300 text-xs font-semibold mb-2">Job Type</label>
                            <select
                                className="w-full h-[40px] bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-xl px-3 text-sm focus:outline-none focus:border-neutral-700"
                                value={selectedJobType}
                                onChange={(e) => setSelectedJobType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="remote">Remote</option>
                                <option value="internship">Internship</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>

                        {/* Filter by Max Salary */}
                        <TextField className="w-full">
                            <Label className="text-neutral-300 text-xs font-semibold mb-1">Max Salary (BDT)</Label>
                            <Input
                                type="number"
                                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl"
                                placeholder="e.g. 60000"
                                value={maxSalaryLimit}
                                onChange={(e) => setMaxSalaryLimit(e.target.value)}
                            />
                        </TextField>

                    </Form>
                </div>

                {/* 3x3 Grid Layout Output Section */}
                {jobsData?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobsData?.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                        <PaginationWithSummary jobsData={jobsData} filters={filters} page={page} setPage={setPage}
                            total={total} />
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl">
                        <p className="text-neutral-500">No jobs found matching your filter criteria.</p>
                    </div>
                )}

            </div>
        </div>
    );
}











