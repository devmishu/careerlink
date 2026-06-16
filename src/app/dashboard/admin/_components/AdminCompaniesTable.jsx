"use client";

import React from "react";

export default function AdminCompaniesTable({ companies = [], onApprove, onReject }) {

    // স্ট্যাটাস টেক্সট এবং ডটের কালার সেট করার জন্য হেল্পার
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return { text: "Approved", dot: "bg-emerald-500", textClass: "text-emerald-500" };
            case "rejected":
                return { text: "Rejected", dot: "bg-rose-500", textClass: "text-rose-500" };
            default: // pending
                return { text: "Pending", dot: "bg-amber-500", textClass: "text-amber-500" };
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-[#121212] rounded-2xl border border-neutral-800/80 shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    {/* Table Header */}
                    <thead>
                        <tr className="border-b border-neutral-800/60">
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Company Name</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Recruiter Email</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Industry</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Status</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Date Submitted</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase text-right pr-4">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-neutral-900/60">
                        {companies?.map((company) => {
                            const statusInfo = getStatusBadge(company.status);

                            // কোম্পানির নামের প্রথম দুই অক্ষর লোগো আইকন হিসেবে
                            const shortName = company.name ? company.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "CO";

                            return (
                                <tr key={company._id} className="group hover:bg-neutral-900/30 transition-colors">
                                    {/* Company Name with Icon */}
                                    <td className="py-4.5 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-xs font-bold text-neutral-300">
                                                {shortName}
                                            </div>
                                            <span className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                                                {company.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Recruiter Email */}
                                    <td className="py-4.5 align-middle text-neutral-400 text-sm">
                                        {company.recruiterEmail || company.email || "N/A"}
                                    </td>

                                    {/* Industry Badge */}
                                    <td className="py-4.5 align-middle">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-400">
                                            {company.industry || "Technology"}
                                        </span>
                                    </td>

                                    {/* Status Dot */}
                                    <td className="py-4.5 align-middle">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                                            <span className={`text-xs font-semibold ${statusInfo.textClass}`}>
                                                {statusInfo.text}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Date Submitted */}
                                    <td className="py-4.5 align-middle text-neutral-400 text-sm font-medium">
                                        {company.dateSubmitted || "Oct 12, 2023"}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4.5 align-middle text-right pr-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {company.status !== "Approved" && (
                                                <button
                                                    onClick={() => onApprove && onApprove(company._id)}
                                                    className="px-3 py-1.5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-900/60 text-emerald-400 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {company.status !== "Rejected" && (
                                                <button
                                                    onClick={() => onReject && onReject(company._id)}
                                                    className="px-3 py-1.5 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/60 text-rose-400 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-5 mt-4 border-t border-neutral-900/80 gap-4">
                <p className="text-xs text-neutral-500">
                    Showing <span className="text-neutral-400 font-medium">1-{companies?.length || 0}</span> of <span className="text-neutral-400 font-medium">{companies?.length || 0}</span> companies
                </p>
                <div className="flex items-center gap-1.5">
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all text-sm">&lt;</button>
                    <button className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold shadow-md">1</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs font-medium">2</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs font-medium">3</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all text-sm">&gt;</button>
                </div>
            </div>
        </div>
    );
}