"use client";

import React, { useState, useRef } from "react";
import {
    Form,
    Input,
    Select,
    Label,
    ListBox,
    TextArea,
    Button
} from "@heroui/react"; // or your specified hero ui 3.1.0 import path
import {
    ChevronDown,
    Pencil,
    Globe,
    Geo,
    Persons,
    Check,
    Xmark,
    Clock,
    CloudArrowUpIn
} from "@gravity-ui/icons";

export default function CompanyProfileManager() {
    // Mocking database state. Replace with your Better Auth user meta / fetch query
    const [company, setCompany] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [logoPreview, setLogoPreview] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    const fileInputRef = useRef(null);

    // Handle ImgBB Upload
    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show temporary preview locally
        setLogoPreview(URL.createObjectURL(file));
        setUploadingLogo(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            // Replace with your env variable or direct key
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setLogoUrl(result.data.url);
            } else {
                alert("Failed to upload image to ImgBB.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploadingLogo(false);
        }
    };

    // Form Submission (Registration & Editing updates)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const companyData = {
            name: formData.get("companyName"),
            industry: formData.get("industry"),
            website: formData.get("websiteUrl"),
            location: formData.get("location"),
            employeeCount: formData.get("employeeCount"),
            logo: logoUrl || (company ? company.logo : ""),
            description: formData.get("description"),
            status: company ? company.status : "Pending" // Retain status or default to pending
        };

        setCompany(companyData);
        setIsEditing(false);
    };

    // Status Badge Component helper
    const renderStatusBadge = (status) => {
        const styles = {
            Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20"
        };
        const icons = {
            Pending: <Clock className="w-3.5 h-3.5 inline mr-1" />,
            Approved: <Check className="w-3.5 h-3.5 inline mr-1" />,
            Rejected: <Xmark className="w-3.5 h-3.5 inline mr-1" />
        };

        return (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.Pending}`}>
                {icons[status] || icons.Pending} {status}
            </span>
        );
    };

    // --- CONDITION 1: NO COMPANY REGISTERED OR CURRENTLY EDITING ---
    if (!company || isEditing) {
        return (
            <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl shadow-2xl my-10 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-neutral-800/60 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold text-neutral-100">
                            {isEditing ? "Update Company Details" : "Register New Company"}
                        </h2>
                        <p className="text-xs text-neutral-500 mt-1">
                            Enter your business details to start hiring on HireLoop.
                        </p>
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            <Xmark size={18} />
                        </button>
                    )}
                </div>

                {/* Form Container */}
                <Form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 w-full">

                    {/* Row 1: Company Name & Industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Input
                            isRequired
                            name="companyName"
                            type="text"
                            label="Company Name"
                            labelPlacement="outside"
                            defaultValue={company?.name || ""}
                            placeholder="e.g. Acme Corp"
                            classNames={{
                                label: "text-neutral-300 text-sm font-medium mb-1.5",
                                inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                input: "text-neutral-200 text-sm placeholder:text-neutral-600"
                            }}
                        />

                        <Select isRequired name="industry" className="w-full flex flex-col" defaultSelectedKeys={company?.industry ? [company.industry.toLowerCase()] : undefined}>
                            <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                                Industry / Category
                            </Label>
                            <Select.Trigger
                                className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between"
                            >
                                <Select.Value placeholder="Technology" />
                                <ChevronDown size={16} className="text-neutral-400" />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                                <ListBox className="p-1">
                                    {["Technology", "Design", "Marketing", "Finance"].map((ind) => (
                                        <ListBox.Item id={ind.toLowerCase()} key={ind} textValue={ind} className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                            {ind}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Row 2: Website URL & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Input
                            isRequired
                            name="websiteUrl"
                            type="text"
                            label="Website URL"
                            labelPlacement="outside"
                            defaultValue={company?.website || ""}
                            placeholder="www.company.com"
                            startContent={
                                <div className="text-neutral-500 text-sm bg-neutral-900 border-r border-neutral-800 -ml-3 px-3 h-11 flex items-center rounded-l-xl select-none">
                                    https://
                                </div>
                            }
                            classNames={{
                                label: "text-neutral-300 text-sm font-medium mb-1.5",
                                inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 pl-3 transition-all",
                                input: "text-neutral-200 text-sm placeholder:text-neutral-600 pl-2"
                            }}
                        />

                        <Input
                            isRequired
                            name="location"
                            type="text"
                            label="Location"
                            labelPlacement="outside"
                            defaultValue={company?.location || ""}
                            placeholder="City, Country"
                            startContent={<Geo size={16} className="text-neutral-500 mr-1" />}
                            classNames={{
                                label: "text-neutral-300 text-sm font-medium mb-1.5",
                                inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                input: "text-neutral-200 text-sm placeholder:text-neutral-600"
                            }}
                        />
                    </div>

                    {/* Row 3: Employee Count Range & Company Logo Uploader */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-start">
                        <Select isRequired name="employeeCount" className="w-full flex flex-col" defaultSelectedKeys={company?.employeeCount ? [company.employeeCount] : undefined}>
                            <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                                Employee Count Range
                            </Label>
                            <Select.Trigger
                                className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between"
                            >
                                <Select.Value placeholder="1-10 employees" />
                                <ChevronDown size={16} className="text-neutral-400" />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                                <ListBox className="p-1">
                                    {["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"].map((range) => (
                                        <ListBox.Item id={range} key={range} textValue={range} className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                            {range}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Custom File Upload Element built exactly like design snippet */}
                        <div className="flex flex-col">
                            <span className="text-neutral-300 text-sm font-medium mb-1.5">Company Logo</span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleLogoChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-3 bg-[#1c1c1c] border border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl p-3 cursor-pointer transition-all h-14"
                            >
                                <div className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                                    {logoPreview || company?.logo ? (
                                        <img
                                            src={logoPreview || company?.logo}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <CloudArrowUpIn size={16} />
                                    )}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-medium text-neutral-200">
                                        {uploadingLogo ? "Uploading..." : "Upload image"}
                                    </span>
                                    <span className="text-[10px] text-neutral-500">PNG, JPG up to 5MB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Brief Description */}
                    <TextArea
                        isRequired
                        name="description"
                        label="Brief Description"
                        labelPlacement="outside"
                        defaultValue={company?.description || ""}
                        placeholder="Tell us about your company's mission and culture..."
                        rows={4}
                        classNames={{
                            label: "text-neutral-300 text-sm font-medium mb-1.5",
                            inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl p-3.5 transition-all",
                            input: "text-neutral-200 text-sm placeholder:text-neutral-600 resize-none"
                        }}
                    />

                    {/* Footer Action Section */}
                    <div className="h-[1px] bg-neutral-800/60 w-full mt-2" />

                    <div className="p-2 bg-transparent flex justify-end items-center gap-3 w-full">
                        <Button
                            type="button"
                            onClick={() => isEditing ? setIsEditing(false) : setCompany(null)}
                            className="px-5 h-10 rounded-xl text-sm font-medium text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-800/60 transition-all"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={uploadingLogo}
                            className="px-5 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md disabled:opacity-50"
                        >
                            {isEditing ? "Save Changes" : "Register Company"}
                        </Button>
                    </div>

                </Form>
            </div>
        );
    }

    // --- CONDITION 2: COMPANY IS ALREADY REGISTERED (VIEW MODE) ---
    return (
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl shadow-2xl my-10 p-6 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-neutral-800/60">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1c1c1c] border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden p-1">
                        {company.logo ? (
                            <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain rounded-lg" />
                        ) : (
                            <div className="text-neutral-600 font-bold text-xl">{company.name.charAt(0)}</div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl font-bold text-neutral-100">{company.name}</h1>
                            {renderStatusBadge(company.status)}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1 capitalize">{company.industry}</p>
                    </div>
                </div>

                <Button
                    onClick={() => {
                        setLogoPreview(company.logo);
                        setIsEditing(true);
                    }}
                    className="h-9 px-4 rounded-xl text-xs font-medium text-neutral-300 border border-neutral-800 bg-[#121212] hover:bg-neutral-800 transition-all flex items-center gap-2"
                >
                    <Pencil size={14} /> Edit Profile
                </Button>
            </div>

            {/* Grid metadata attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-neutral-800/60">
                <div className="flex items-center gap-2.5 text-neutral-300">
                    <Globe size={16} className="text-neutral-500" />
                    <div className="flex flex-col">
                        <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Website</span>
                        <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline truncate max-w-[160px]">
                            {company.website}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 text-neutral-300">
                    <Geo size={16} className="text-neutral-500" />
                    <div className="flex flex-col">
                        <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Location</span>
                        <span className="text-sm text-neutral-200 truncate">{company.location}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 text-neutral-300">
                    <Persons size={16} className="text-neutral-500" />
                    <div className="flex flex-col">
                        <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Employees</span>
                        <span className="text-sm text-neutral-200">{company.employeeCount}</span>
                    </div>
                </div>
            </div>

            {/* Description display section */}
            <div className="pt-6">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">About Company</h3>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {company.description}
                </p>
            </div>
        </div>
    );
} 