'use client';

import React from 'react';
import Link from 'next/link';

// transaction প্রপসটি এখানে রিসিভ করা হচ্ছে
export default function SuccessCard({ transaction }) {

    // কোনো কারণে প্রপস না আসলে বা ফেইল করলে সেফটি ফলব্যাক অবজেক্ট
    const details = transaction || {
        id: "TXN-UNKNOWN",
        date: new Date().toLocaleDateString(),
        planName: "Pro Plan Upgrade",
        amount: "$0.00",
        paymentMethod: "Card Authorized",
        customerEmail: "your registered email"
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans antialiased flex items-center justify-center py-16 px-4">
            <div className="max-w-md w-full text-center">

                {/* Success Icon Animation Wrapper */}
                <div className="mb-6 flex justify-center">
                    <div className="relative flex items-center justify-center w-20 h-20 bg-[#121214] border border-[#1f1f23] rounded-2xl shadow-xl">
                        {/* Decorative glow effect */}
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl opacity-70 animate-pulse" />

                        {/* Green Ring and Checkmark */}
                        <div className="relative w-12 h-12 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
                            <svg
                                className="w-6 h-6 animate-[bounce_1s_ease-in-out_1]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Typography Headers */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                    Payment Successful!
                </h1>
                <p className="text-[#a1a1aa] text-sm max-w-sm mx-auto mb-8">
                    Thank you for your purchase. Your account tier has been dynamically upgraded instantly.
                </p>

                {/* Digital Receipt / Invoice breakdown Card */}
                <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-5 text-left mb-8 shadow-2xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717a] mb-4 border-b border-[#1f1f23] pb-2">
                        Transaction Summary
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#a1a1aa]">Activated Tier</span>
                            <span className="font-semibold text-white">{details.planName}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#a1a1aa]">Amount Charged</span>
                            <span className="font-bold text-emerald-400">{details.amount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#a1a1aa]">Invoice Session ID</span>
                            <span className="font-mono text-xs text-[#e4e4e7] max-w-[180px] truncate" title={details.id}>
                                {details.id}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#a1a1aa]">Status</span>
                            <span className="text-emerald-400 text-xs bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
                                Paid
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#a1a1aa]">Date</span>
                            <span className="text-[#e4e4e7]">{details.date}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/browsejobs"
                        className="flex-1 py-3 px-4 rounded-xl bg-white text-black hover:bg-[#e4e4e7] font-semibold text-sm transition-all flex items-center justify-center gap-2"
                    >
                        <span>Start Applying</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#242427] text-white hover:bg-[#2e2e33] border border-[#2d2d34] font-semibold text-sm transition-all text-center"
                    >
                        Go to Dashboard
                    </Link>
                </div>

                {/* Safety / Help footer message */}
                <p className="text-[#71717a] text-xs mt-8">
                    A confirmation email has been sent to <span className="text-zinc-300 font-medium">{details.customerEmail}</span> along with your payment records.
                </p>

            </div>
        </div>
    );
}