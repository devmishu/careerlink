import {
    Building2,
    MapPin,
    CircleDollarSign,
    Calendar,
    Briefcase,
    Gift,
    ArrowLeft,
} from "lucide-react";

import { Card, Button, Link, Chip } from "@heroui/react";
import { getJobsById } from "@/lib/api/jobs";



const JobDetails = async ({ params }) => {
    const { id } = await params;

    const singleJob = await getJobsById(id);
    const jobData = singleJob.data;

    console.log("jobData..........", jobData);


    return (
        <div className="max-w-5xl mx-auto px-4 py-8 bg-background min-h-screen">
            {/* Back Button */}
            <Link
                href="#"
                className="flex items-center gap-2 text-small text-default-500 hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to Job Listings
            </Link>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="flex gap-4 items-center">
                        <img
                            src={jobData.companyLogo}
                            alt={jobData.companyName}
                            className="w-16 h-16 object-contain rounded-xl border border-default-200 p-2 bg-white"
                        />

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                {jobData.jobTitle}
                            </h1>

                            <p className="text-medium font-semibold text-primary mt-1">
                                {jobData.companyName}
                            </p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <Chip
                            variant="flat"
                            color="primary"
                            size="sm"
                            className="capitalize"
                        >
                            {jobData.jobType}
                        </Chip>

                        <Chip
                            variant="flat"
                            color="secondary"
                            size="sm"
                            className="capitalize"
                        >
                            {jobData.jobCategory}
                        </Chip>

                        <Chip
                            variant="dot"
                            color="success"
                            size="sm"
                            className="capitalize"
                        >
                            {jobData.status}
                        </Chip>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Briefcase className="size-5 text-primary" />
                            Job Description & Responsibilities
                        </h3>

                        <p className="text-default-600 leading-relaxed text-medium">
                            {jobData.responsibilities}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Gift className="size-5 text-secondary" />
                            Perks & Benefits
                        </h3>

                        <ul className="space-y-2">
                            {jobData.benefits
                                .split(",")
                                .map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-default-600 text-medium"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        {benefit.trim()}
                                    </li>
                                ))}
                        </ul>

                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-1">
                    <Card className="p-6 shadow-sm border border-default-100 rounded-2xl sticky top-6 bg-default-50/50">
                        <h3 className="text-lg font-bold text-foreground mb-4">
                            Job Overview
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-medium text-default-600">
                                <CircleDollarSign className="size-5 text-success" />

                                <div>
                                    <span className="text-small text-default-400 block">
                                        Salary Range
                                    </span>

                                    <span className="font-bold text-foreground">
                                        {jobData.minSalary} - {jobData.maxSalary}{" "}
                                        {jobData.currency}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-medium text-default-600">
                                <Calendar className="size-5 text-warning" />

                                <div>
                                    <span className="text-small text-default-400 block">
                                        Application Deadline
                                    </span>

                                    <span className="font-semibold text-foreground">
                                        {jobData.applicationDate}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-medium text-default-600">
                                <MapPin className="size-5 text-danger" />

                                <div>
                                    <span className="text-small text-default-400 block">
                                        Location
                                    </span>

                                    <span className="font-semibold text-foreground">
                                        {jobData.jobLocation}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-medium text-default-600">
                                <Building2 className="size-5 text-primary" />

                                <div>
                                    <span className="text-small text-default-400 block">
                                        Company
                                    </span>

                                    <span className="font-semibold text-foreground">
                                        {jobData.companyName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            size="lg"
                            className="font-bold text-medium w-full shadow-md"
                            radius="xl"
                        >
                            Apply For This Job
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;