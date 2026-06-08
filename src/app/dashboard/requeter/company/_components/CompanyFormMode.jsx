import React from "react";
import { Form, TextArea, Button } from "@heroui/react";
import { Xmark, Geo } from "@gravity-ui/icons";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import LogoUploader from "./LogoUploader";

export default function CompanyFormMode({ 
    company, 
    isEditing, 
    onCancel, 
    onSubmit, 
    uploadingLogo, 
    logoPreview, 
    onLogoChange, 
    fileInputRef 
}) {
    const industryOptions = [
        { label: "Technology", value: "technology" },
        { label: "Design", value: "design" },
        { label: "Marketing", value: "marketing" },
        { label: "Finance", value: "finance" }
    ];

    const employeeOptions = [
        { label: "1-10 employees", value: "1-10 employees" },
        { label: "11-50 employees", value: "11-50 employees" },
        { label: "51-200 employees", value: "51-200 employees" },
        { label: "201+ employees", value: "201+ employees" }
    ];

    return (
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl shadow-2xl my-10 overflow-hidden">
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
                    <button type="button" onClick={onCancel} className="text-neutral-400 hover:text-neutral-200 transition-colors">
                        <Xmark size={18} />
                    </button>
                )}
            </div>

            <Form onSubmit={onSubmit} className="p-6 flex flex-col gap-5 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <FormInput
                        name="companyName"
                        type="text"
                        label="Company Name"
                        defaultValue={company?.name || ""}
                        placeholder="e.g. Acme Corp"
                    />

                    <FormSelect
                        label="Industry / Category"
                        name="industry"
                        placeholder="Technology"
                        options={industryOptions}
                        defaultSelectedKeys={company?.industry ? [company.industry.toLowerCase()] : undefined}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <FormInput
                        name="websiteUrl"
                        type="text"
                        label="Website URL"
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

                    <FormInput
                        name="location"
                        type="text"
                        label="Location"
                        defaultValue={company?.location || ""}
                        placeholder="City, Country"
                        startContent={<Geo size={16} className="text-neutral-500 mr-1" />}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-start">
                    <FormSelect
                        label="Employee Count Range"
                        name="employeeCount"
                        placeholder="1-10 employees"
                        options={employeeOptions}
                        defaultSelectedKeys={company?.employeeCount ? [company.employeeCount] : undefined}
                    />

                    <LogoUploader
                        fileInputRef={fileInputRef}
                        onLogoChange={onLogoChange}
                        logoPreview={logoPreview}
                        companyLogo={company?.logo}
                        uploadingLogo={uploadingLogo}
                    />
                </div>

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

                <div className="h-[1px] bg-neutral-800/60 w-full mt-2" />

                <div className="p-2 bg-transparent flex justify-end items-center gap-3 w-full">
                    <Button
                        type="button"
                        onClick={onCancel}
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