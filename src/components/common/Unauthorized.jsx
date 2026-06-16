"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full text-center bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-100 dark:border-neutral-800/60">

                {/* Animated Shield/Lock Icon Container */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 mb-6 animate-bounce">
                    <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" h="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Error Code & Typography */}
                <span className="block text-sm font-semibold tracking-wider text-red-500 uppercase mb-2">
                    Error 401
                </span>
                <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight mb-3">
                    Access Denied
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8">
                    Oops! You don&apos;t have permission to access this page. Please log in with an authorized account or go back to safety.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-6 h-11 inline-flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                    >
                        Go Back
                    </button>

                    <Link
                        href="/signin"
                        className="w-full sm:w-auto px-6 h-11 inline-flex items-center justify-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-500/20 dark:shadow-none transition-all active:scale-[0.98] cursor-pointer"
                    >
                        Sign In Now
                    </Link>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800/60">
                    <Link
                        href="/"
                        className="text-xs text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                        Back to Home Page
                    </Link>
                </div>

            </div>
        </div>
    );
}