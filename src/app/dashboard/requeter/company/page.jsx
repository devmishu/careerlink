"use client";

import React from "react";
import {
    Form,
    TextField,
    Label,
    Input,
    Button
} from "@heroui/react";
import { MapPin, UploadCloud, ChevronDown } from "lucide-react";

const handleJobPost = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const jobData = Object.fromEntries(formData.entries());

    // console.log("jobData:", jobData);
}

export default function RegisterCompanyForm() {
    return (
        <div className="w-full flex items-center justify-center p-4">
            {/* Form Container Card */}
            <div className="w-full max-w-[640px] bg-[#121212] border border-neutral-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">

                {/* Header Section */}
                <div className="p-6 pb-4 flex flex-col items-start text-left select-none">
                    <h2 className="text-xl font-semibold tracking-tight text-white">
                        Register New Company
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                        Enter your business details to start hiring on HireLoop.
                    </p>
                </div>

                {/* Divider line under header */}
                <div className="h-[1px] bg-neutral-800/60 w-full" />

                {/* Core Form Matrix Content */}
                <Form
                    onSubmit={handleJobPost}
                    className="p-6 flex flex-col gap-5 w-full">

                    {/* Row 1: Company Name & Industry / Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <TextField isRequired name="companyName" type="text" className="w-full">
                            <Label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Company Name
                            </Label>
                            <Input
                                name="companyName"
                                placeholder="e.g. Acme Corp"
                                className="w-full bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl px-3.5 h-11 text-sm outline-none focus:border-neutral-700 transition-all placeholder:text-neutral-600"
                            />
                        </TextField>

                        <div className="w-full flex flex-col">
                            <label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Industry / Category
                            </label>
                            <div className="relative w-full">
                                <select
                                    name="industry"
                                    defaultValue="technology"
                                    className="w-full bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl px-3.5 h-11 text-sm outline-none focus:border-neutral-700 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="technology">Technology</option>
                                    <option value="design">Design</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="finance">Finance</option>
                                </select>
                                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Website URL & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <TextField isRequired name="websiteUrl" type="text" className="w-full">
                            <Label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Website URL
                            </Label>
                            <div className="flex w-full items-center bg-[#1c1c1c] border border-neutral-800 rounded-xl h-11 overflow-hidden focus-within:border-neutral-700 transition-all">
                                <span className="bg-neutral-800/40 text-neutral-500 text-sm px-3.5 h-full flex items-center border-r border-neutral-800/80 select-none">
                                    https://
                                </span>
                                <Input
                                    name="websiteUrl"
                                    placeholder="www.company.com"
                                    className="w-full bg-transparent text-neutral-200 px-3.5 h-full text-sm outline-none border-none placeholder:text-neutral-600"
                                />
                            </div>
                        </TextField>

                        <TextField isRequired name="location" type="text" className="w-full">
                            <Label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Location
                            </Label>
                            <div className="relative w-full flex items-center">
                                <div className="absolute left-3.5 text-neutral-500 pointer-events-none">
                                    <MapPin size={16} />
                                </div>
                                <Input
                                    name="location"
                                    placeholder="City, Country"
                                    className="w-full bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl pl-10 pr-3.5 h-11 text-sm outline-none focus:border-neutral-700 transition-all placeholder:text-neutral-600"
                                />
                            </div>
                        </TextField>
                    </div>

                    {/* Row 3: Employee Count Range & Company Logo Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="w-full flex flex-col">
                            <label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Employee Count Range
                            </label>
                            <div className="relative w-full">
                                <select
                                    name="employeeCount"
                                    defaultValue="1-10"
                                    className="w-full bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl px-3.5 h-11 text-sm outline-none focus:border-neutral-700 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201+">201+ employees</option>
                                </select>
                                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col">
                            <label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                                Company Logo
                            </label>
                            <label className="w-full bg-[#1c1c1c]/40 border border-neutral-800 border-dashed rounded-xl h-11 flex items-center px-3.5 gap-3 cursor-pointer hover:bg-[#1c1c1c]/70 transition-all select-none">
                                <input
                                    type="file"
                                    name="companyLogo"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            alert(`Selected file: ${file.name}`);
                                        }
                                    }}
                                />

                                <div className="w-7 h-7 rounded-lg bg-neutral-800/60 border border-neutral-700/30 flex items-center justify-center text-neutral-400">
                                    <UploadCloud size={14} />
                                </div>

                                <div className="flex flex-col text-left">
                                    <span className="text-neutral-300 text-xs font-medium">Upload image</span>
                                    <span className="text-[10px] text-neutral-500">PNG, JPG up to 5MB</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Row 4: Brief Description */}
                    <div className="w-full flex flex-col">
                        <Label className="text-neutral-300 text-sm font-medium mb-1.5 inline-block text-left w-full">
                            Brief Description
                        </Label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Tell us about your company's mission and culture..."
                            className="w-full bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl p-3.5 text-sm outline-none focus:border-neutral-700 transition-all resize-none placeholder:text-neutral-600"
                        />
                    </div>

                    {/* Footer Execution Action Area Control Line */}
                    <div className="h-[1px] bg-neutral-800/60 w-full mt-2" />

                    {/* Operations Execution Footer Layer Row layout */}
                    <div className="p-4 bg-[#141414] flex justify-end items-center gap-3 w-full">
                        <Button
                            type="reset"
                            variant="secondary"
                            className="px-5 h-10 rounded-xl text-sm font-medium text-neutral-300 border border-neutral-800 hover:bg-neutral-800/60 transition-all cursor-pointer bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-5 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
                        >
                            Register Company
                        </Button>
                    </div>

                </Form>

            </div>
        </div>
    );
}