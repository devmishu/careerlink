// components/JobCard.jsx
import { Card, Avatar } from "@heroui/react";
import Link from "next/link";

export function JobCard({ job }) {
    return (
        <Card className="w-full bg-[#121212] text-white border border-neutral-800 p-6 flex flex-col justify-between gap-4 rounded-2xl hover:border-neutral-700 transition duration-300">

            {/* Top Section: Company Logo and Titles */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-100">
                        {job.jobTitle}
                    </h3>
                    <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
                        {job.companyName}
                    </span>
                </div>
                <Avatar className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 p-1">
                    <Avatar.Image src={job.companyLogo} alt={job.companyName} />
                    <Avatar.Fallback className="bg-neutral-800 text-sm">UB</Avatar.Fallback>
                </Avatar>
            </div>

            {/* Responsibilities/Description */}
            <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                {job.responsibilities}
            </p>

            {/* Badge Pills Section (Location, Type, Salary) */}
            <div className="flex flex-wrap gap-2 pt-2">
                {/* Location */}
                <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    {job.jobLocation}, BD
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full text-xs capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    {job.jobType}
                </div>

                {/* Salary */}
                <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {job.minSalary} - {job.maxSalary} {job.currency.toUpperCase()}
                </div>
            </div>

            {/* Footer action */}
            <div className="pt-2 border-t border-neutral-900 flex justify-between items-center">
                <span className="text-xs text-neutral-500">Apply before: {job.applicationDate}</span>
                <Link href={`/browsejobs/${job._id}`} className="text-sm font-medium text-neutral-200 hover:text-white flex items-center gap-1 group transition">
                    Apply Now
                    <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
                </Link>
            </div>
        </Card>
    );
}