
import React from "react";
import { Card } from "@heroui/react";

// একটি মাত্র সিঙ্গেল, রিইউজেবল এবং প্রেসিবল কার্ড কম্পোনেন্ট
export function RoleCard({ title, value, icon,  }) {
    return (
        <Card
           
            className="bg-neutral-900/40 dark:bg-[#121212] border border-neutral-800/60 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5   flex flex-col items-start gap-4 text-left select-none"
        >
            {/* Icon Container (ডার্ক গ্লেজড চারকোল ব্যাকগ্রাউন্ড) */}
            <div className="w-10 h-10 rounded-xl bg-neutral-800/70 border border-neutral-700/30 flex items-center justify-center text-neutral-300">
                {icon}
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-1">
                <span className="text-neutral-400 text-sm font-medium tracking-wide">
                    {title}
                </span>
                <span className="text-white font-semibold text-3xl tracking-tight">
                    {value}
                </span>
            </div>
        </Card>
    );
}