"use client"
import React, { useState } from "react";
import { Xmark } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/application";

export default function ApplyJobsForm({ applicant, job, onCancel }) {
    const [submitting, setSubmitting] = useState(false);
    console.log("applicant.............", applicant);

    const experienceOptions = [
        { label: "Fresher / Entry Level", value: "fresher" },
        { label: "1-2 Years", value: "1-2 years" },
        { label: "3-5 Years", value: "3-5 years" },
        { label: "5+ Years", value: "5+ years" }
    ];

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const applicationData = Object.fromEntries(formData.entries());

        console.log(applicationData);
        const submitssionData = {
            ...applicationData,
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            companyName: job?.companyName,
            applicantName: applicant?.name,
            applicantId: applicant?.id,
            applicantEmail: applicant?.email,
            status: "Applied"
        }

        try {


            const data = await submitApplication(submitssionData);


            console.log(data);

            alert(`${data.message}`);

        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl shadow-2xl my-10 overflow-hidden">
            {/* Form Header */}
            <div className="p-6 border-b border-neutral-800/60 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-semibold text-neutral-100">
                        Apply for {job?.jobTitle || "This Job"}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                        {job?.companyName ? `at ${job.companyName}` : "Review your profile details and submit your application."}
                    </p>
                </div>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-neutral-400 hover:text-neutral-200 transition-colors focus:outline-none"
                    >
                        <Xmark size={18} />
                    </button>
                )}
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 w-full">

                {/* Applicant Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col">
                        <label className="text-neutral-300 text-sm font-medium mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            name="fullName"
                            type="text"
                            defaultValue={applicant?.name || ""}
                            placeholder="John Doe"
                            className="bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none text-neutral-200 text-sm placeholder:text-neutral-600 rounded-xl h-11 px-3 transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-neutral-300 text-sm font-medium mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            name="email"
                            type="email"
                            defaultValue={applicant?.email || ""}
                            placeholder="john@example.com"
                            className="bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none text-neutral-200 text-sm placeholder:text-neutral-600 rounded-xl h-11 px-3 transition-all"
                        />
                    </div>
                </div>

                {/* Professional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-end">
                    <div className="flex flex-col w-full">
                        <label className="text-neutral-300 text-sm font-medium mb-1.5">
                            GitHub Profile
                        </label>
                        <div className="flex bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-700 rounded-xl h-11 overflow-hidden transition-all">
                            <span className="text-neutral-500 text-sm bg-neutral-900 border-r border-neutral-800 px-3 flex items-center select-none">
                                https://
                            </span>
                            <input
                                name="githubProfile"
                                type="text"
                                defaultValue={applicant?.github || ""}
                                placeholder="github.com/username"
                                className="bg-transparent focus:outline-none text-neutral-200 text-sm placeholder:text-neutral-600 pl-3 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-neutral-300 text-sm font-medium mb-1.5">
                            Experience Level
                        </label>
                        <select
                            name="experience"
                            defaultValue={applicant?.experience || ""}
                            className="bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none text-neutral-200 text-sm rounded-xl h-11 px-3 transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-neutral-600">Select your experience</option>
                            {experienceOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-[#1c1c1c] text-neutral-200">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Portfolio Website URL */}
                <div className="flex flex-col w-full">
                    <label className="text-neutral-300 text-sm font-medium mb-1.5">
                        Portfolio Website
                    </label>
                    <div className="flex bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-700 rounded-xl h-11 overflow-hidden transition-all">
                        <span className="text-neutral-500 text-sm bg-neutral-900 border-r border-neutral-800 px-3 flex items-center select-none">
                            https://
                        </span>
                        <input
                            name="portfolioUrl"
                            type="text"
                            defaultValue={applicant?.portfolio || ""}
                            placeholder="yourportfolio.com"
                            className="bg-transparent focus:outline-none text-neutral-200 text-sm placeholder:text-neutral-600 pl-3 w-full"
                        />
                    </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col w-full">
                    <label className="text-neutral-300 text-sm font-medium mb-1.5">
                        Cover Letter / Why should we hire you? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        name="coverLetter"
                        rows={5}
                        placeholder="Briefly describe your expertise, stack match, and why you are interested in this position..."
                        className="bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none text-neutral-200 text-sm placeholder:text-neutral-600 rounded-xl p-3.5 transition-all resize-none"
                    />
                </div>

                {/* Divider Line */}
                <div className="h-[1px] bg-neutral-800/60 w-full mt-2" />

                {/* Action Buttons */}
                <div className="p-2 bg-transparent flex justify-end items-center gap-3 w-full">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 h-10 rounded-xl text-sm font-medium text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-800/60 transition-all focus:outline-none"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md disabled:opacity-50 focus:outline-none"
                    >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}