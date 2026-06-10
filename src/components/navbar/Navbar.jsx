"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "./Themetogle";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const session = useSession();

    console.log("session", session);

    const user = session?.data?.user;
    console.log(user);

    const handleSignout = () => {
        signOut();
    }

    return (
        <nav className="navbar-bg sticky top-0 z-50 w-full h-20 flex items-center justify-between app-container">
            {/* Brand Logo Container */}
            <div className="flex items-center gap-2 cursor-pointer select-none">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-primary font-bold text-lg tracking-tight">Programming</span>
                    <span className="text-primary font-bold text-lg tracking-tight">Hero</span>
                </div>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="hidden md:flex items-center gap-6">
                {/* Central Pill Nav Container */}
                <div className="flex items-center gap-6 bg-neutral-900/40 dark:bg-neutral-900/60 border border-neutral-800/50 rounded-full px-6 py-2">
                    <a href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
                        Browse Jobs
                    </a>
                    <a href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
                        Company
                    </a>
                    <a href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
                        Pricing
                    </a>
                </div>

                {/* Divider Element */}
                <div className="h-5 w-[1px] bg-neutral-800 mx-1" />
                <p>Hi, { user?.name}</p>

                {/* Action Controls */}
                {
                    user ? <a
                        onClick={() => handleSignout()}

                        href="#" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 font-medium text-sm transition-colors">
                        Sign Out
                    </a> :
                        <Link href="/signin" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 font-medium text-sm transition-colors">
                            Sign In
                        </Link>
                }


                <button className="bg-white hover:bg-neutral-100 text-neutral-950 font-semibold px-5 h-10 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer">
                    Get Started
                </button>
                <ThemeSwitch />
            </div>

            {/* Mobile Menu Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-primary focus:outline-none p-1 cursor-pointer"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-900 flex flex-col p-6 gap-4 md:hidden z-40">
                    <a href="#" className="text-secondary hover:text-primary text-lg py-1" onClick={() => setIsOpen(false)}>
                        Browse Jobs
                    </a>
                    <a href="#" className="text-secondary hover:text-primary text-lg py-1" onClick={() => setIsOpen(false)}>
                        Company
                    </a>
                    <a href="#" className="text-secondary hover:text-primary text-lg py-1" onClick={() => setIsOpen(false)}>
                        Pricing
                    </a>
                    <hr className="border-neutral-900 my-1" />
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium text-lg py-1" onClick={() => setIsOpen(false)}>
                        Sign In
                    </a>
                    <button className="w-full bg-white text-neutral-950 font-semibold h-11 rounded-xl active:scale-[0.98] transition-all mt-2 cursor-pointer">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
}