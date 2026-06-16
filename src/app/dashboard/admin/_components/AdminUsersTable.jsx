"use client";

import React from "react";
import Image from "next/image";

export default function AdminUsersTable({ users = [], onRoleChange, onSuspend, onActivate, onDelete }) {

    // স্ট্যাটাস স্টাইল নির্ধারণের হেল্পার
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-emerald-950/20 text-emerald-500 border border-emerald-800/40";
            case "suspended":
                return "bg-rose-950/20 text-rose-500 border border-rose-800/40";
            default:
                return "bg-neutral-800 text-neutral-400 border border-neutral-700";
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-[#121212] rounded-2xl border border-neutral-800/80 shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    {/* Table Header */}
                    <thead>
                        <tr className="border-b border-neutral-800/60">
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">User Name</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Email Address</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Role</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Join Date</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase">Status</th>
                            <th className="pb-4 pt-2 text-neutral-400 font-medium text-xs tracking-wider uppercase text-right pr-4">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-neutral-900/60">
                        {users?.map((user) => {
                            // নামের প্রথম ২ অক্ষর (যদি ইমেজ না থাকে)
                            const shortName = user.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "US";

                            // রোল চেক করার জন্য সুরক্ষিত মেথড (.toLowerCase() দিয়ে নিরাপদ করা হয়েছে)
                            const isRecruiter = user.role?.toLowerCase() === "recruiter";

                            return (
                                <tr key={user._id || user.id} className="group hover:bg-neutral-900/30 transition-colors">

                                    {/* User Name with Image/Avatar */}
                                    <td className="py-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            {user.image ? (
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-700/50 relative">
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name || "User profile"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-xs font-bold text-neutral-400">
                                                    {shortName}
                                                </div>
                                            )}
                                            <span className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Email Address */}
                                    <td className="py-4 align-middle text-neutral-400 text-sm">
                                        {user.email}
                                    </td>

                                    {/* Role Badge with Dynamic Icon & Text */}
                                    <td className="py-4 align-middle">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${isRecruiter
                                            ? "bg-white text-neutral-900 border-neutral-200"
                                            : "bg-neutral-900 text-neutral-400 border-neutral-800"
                                            }`}>
                                            {isRecruiter ? (
                                                // Recruiter Briefcase Icon
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ) : (
                                                // Seeker User Icon
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            )}

                                            {/* ডাইনামিক ডেটা এবং প্রথম অক্ষর বড় হাতের করা */}
                                            {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "User"}
                                        </span>
                                    </td>

                                    {/* Join Date */}
                                    <td className="py-4 align-middle text-neutral-400 text-sm">
                                        {user.joinDate || "Oct 12, 2023"}
                                    </td>

                                    {/* Status Pill */}
                                    <td className="py-4 align-middle">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                                            <span className={`w-1 h-1 rounded-full mr-1 ${user.status?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                            {user.status || "Active"}
                                        </span>
                                    </td>

                                    {/* Actions Area */}
                                    <td className="py-4 align-middle text-right pr-4">
                                        <div className="flex items-center justify-end gap-3 text-xs font-medium">

                                            {/* Role Toggle Button (FIXED: অ্যারো ফাংশন ও ডায়নামিক লজিক যোগ করা হয়েছে) */}
                                            <button
                                                onClick={() => onRoleChange && onRoleChange(user.id, user.role ===  "seeker" ? "requeter": "seeker" )}
                                                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                            >
                                                {user.role === "requeter" ? "Make Seeker" : "Make Recruiter"}
                                            </button>

                                            {/* Suspend / Activate Toggle */}
                                            {user.status?.toLowerCase() === "suspended" ? (
                                                <>
                                                    <button
                                                        onClick={() => onActivate && onActivate(user.id)}
                                                        className="text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                                    >
                                                        Activate
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete && onDelete(user._id)}
                                                        className="text-neutral-500 hover:text-rose-500 transition-colors cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => onSuspend && onSuspend(user._id)}
                                                    className="text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
                                                >
                                                    Suspend
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
                    Showing <span className="text-neutral-400 font-medium">1-{users?.length || 0}</span> of <span className="text-neutral-400 font-medium">{users?.length || 0}</span> users
                </p>
                <div className="flex items-center gap-1.5">
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all text-sm">&lt;</button>
                    <button className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold shadow-md">1</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs font-medium">2</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs font-medium">3</button>
                    <span className="text-neutral-600 text-xs px-1">...</span>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs font-medium">1285</button>
                    <button className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all text-sm">&gt;</button>
                </div>
            </div>
        </div>
    );
}