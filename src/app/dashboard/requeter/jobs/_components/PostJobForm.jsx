"use client"
import {
    Form,
    Input,
    Select,
    Label,
    ListBox,
    TextArea,
    Switch,
    Button
} from "@heroui/react";
import { Calendar, ChevronDown, AlertTriangle, Clock } from "lucide-react";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobForm({ company }) {

    const handleJobPost = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const jobData = Object.fromEntries(formData.entries());

        console.log("jobData.........:", jobData);

        const newJobData = {
            ...jobData,
            status: "active",
            companyID: company?._id,
            companyName: company?.name,
            companyLogo: company?.logo,
        }
        try {
            const data = await createJob(newJobData);
            console.log(data);
            alert(`${data.message}`);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-[640px] bg-[#121212] border border-neutral-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">

                {/* Header Section */}
                <div className="p-6 pb-4 flex flex-col items-start text-left select-none">
                    <h2 className="text-xl font-semibold tracking-tight text-white">
                        Post a New Job
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                        Fill in the position details to start receiving applications on HireLoop.
                    </p>
                </div>

                {/* Divider line under header */}
                <div className="h-[1px] bg-neutral-800/60 w-full" />

                {/* Core Form Matrix Content */}
                {
                    company?.status === "Approved" ? (
                        <Form
                            onSubmit={handleJobPost}
                            className="p-6 flex flex-col gap-5 w-full"
                        >
                            {/* Row 1: Job Title & Job Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <Input
                                    isRequired
                                    name="jobTitle"
                                    type="text"
                                    label="Job Title"
                                    labelPlacement="outside"
                                    placeholder="e.g. Senior Software Engineer"
                                    classNames={{
                                        label: "text-neutral-300 text-sm font-medium mb-1.5",
                                        inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                        input: "text-neutral-200 text-sm placeholder:text-neutral-600"
                                    }}
                                />

                                {/* Job Category Select Component */}
                                <Select isRequired name="jobCategory" className="w-full flex flex-col">
                                    <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                                        Job Category
                                    </Label>
                                    <Select.Trigger
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between"
                                    >
                                        <Select.Value placeholder="e.g. Technology" />
                                        <ChevronDown size={16} className="text-neutral-400" />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="technology" textValue="Technology" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Technology
                                            </ListBox.Item>
                                            <ListBox.Item id="design" textValue="Design" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Design
                                            </ListBox.Item>
                                            <ListBox.Item id="marketing" textValue="Marketing" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Marketing
                                            </ListBox.Item>
                                            <ListBox.Item id="finance" textValue="Finance" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Finance
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Row 2: Job Type & Application Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {/* Job Type Select Component */}
                                <Select isRequired name="jobType" className="w-full flex flex-col">
                                    <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                                        Job Type
                                    </Label>
                                    <Select.Trigger
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between"
                                    >
                                        <Select.Value placeholder="Full-time" />
                                        <ChevronDown size={16} className="text-neutral-400" />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="full-time" textValue="Full-time" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Full-time
                                            </ListBox.Item>
                                            <ListBox.Item id="part-time" textValue="Part-time" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Part-time
                                            </ListBox.Item>
                                            <ListBox.Item id="contract" textValue="Contract" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Contract
                                            </ListBox.Item>
                                            <ListBox.Item id="internship" textValue="Internship" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                Internship
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <Input
                                    isRequired
                                    name="applicationDate"
                                    type="date"
                                    label="Application Date"
                                    labelPlacement="outside"
                                    placeholder="15/10/2024"
                                    endContent={<Calendar size={16} className="text-neutral-500 pointer-events-none" />}
                                    classNames={{
                                        label: "text-neutral-300 text-sm font-medium mb-1.5",
                                        inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                        input: "text-neutral-200 text-sm placeholder:text-neutral-600 block"
                                    }}
                                />
                            </div>

                            {/* Row 3: Min Salary & Max Salary & Currency */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-end">
                                <Input
                                    isRequired
                                    name="minSalary"
                                    type="number"
                                    label="Min Salary"
                                    labelPlacement="outside"
                                    placeholder="e.g. 50000"
                                    classNames={{
                                        label: "text-neutral-300 text-sm font-medium mb-1.5",
                                        inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                        input: "text-neutral-200 text-sm placeholder:text-neutral-600"
                                    }}
                                />

                                <Input
                                    isRequired
                                    name="maxSalary"
                                    type="number"
                                    label="Max Salary"
                                    placeholder="e.g. 80000"
                                    classNames={{
                                        label: "text-neutral-300 text-sm font-medium mb-1.5",
                                        inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                                        input: "text-neutral-200 text-sm placeholder:text-neutral-600"
                                    }}
                                />

                                {/* Currency Select Component */}
                                <Select isRequired name="currency" className="w-full flex flex-col">
                                    <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                                        Currency
                                    </Label>
                                    <Select.Trigger
                                        className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between"
                                    >
                                        <Select.Value placeholder="USD $" />
                                        <ChevronDown size={16} className="text-neutral-400" />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="usd" textValue="USD $" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                USD $
                                            </ListBox.Item>
                                            <ListBox.Item id="bdt" textValue="BDT ৳" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                BDT ৳
                                            </ListBox.Item>
                                            <ListBox.Item id="eur" textValue="EUR €" className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                                EUR €
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <Input aria-label="Name" name="jobLocation" className="w-64" placeholder="Job Location" />

                            {/* Row 5: Responsibilities */}
                            <TextArea
                                isRequired
                                name="responsibilities"
                                label="Responsibilities"
                                labelPlacement="outside"
                                placeholder="List the core duties and responsibilities..."
                                rows={4}
                                classNames={{
                                    label: "text-neutral-300 text-sm font-medium mb-1.5",
                                    inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl p-3.5 transition-all",
                                    input: "text-neutral-200 text-sm placeholder:text-neutral-600 resize-none"
                                }}
                            />

                            {/* Row 6: Benefits (Optional) */}
                            <TextArea
                                name="benefits"
                                label="Benefits (Optional)"
                                labelPlacement="outside"
                                placeholder="Describe the additional benefits..."
                                rows={3}
                                classNames={{
                                    label: "text-neutral-300 text-sm font-medium mb-1.5",
                                    inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl p-3.5 transition-all",
                                    input: "text-neutral-200 text-sm placeholder:text-neutral-600 resize-none"
                                }}
                            />

                            {/* Footer Section */}
                            <div className="h-[1px] bg-neutral-800/60 w-full mt-2" />

                            <div className="p-2 bg-transparent flex justify-end items-center gap-3 w-full">
                                <Button
                                    type="reset"
                                    className="px-5 h-10 rounded-xl text-sm font-medium text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-800/60 transition-all"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-5 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md"
                                >
                                    Post Job
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        /* Beautiful Pending/Not Approved UI Section */
                        <div className="p-8 flex flex-col items-center text-center justify-center min-h-[320px] bg-gradient-to-b from-transparent to-neutral-900/20">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-5 animate-pulse">
                                {company?.status === "Pending" ? (
                                    <Clock size={26} />
                                ) : (
                                    <AlertTriangle size={26} />
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-white tracking-tight">
                                {company?.status === "Pending" ? "Verification in Progress" : "Approval Required"}
                            </h3>

                            <p className="text-neutral-400 text-sm max-w-sm mt-2 leading-relaxed">
                                Your company profile is currently <span className="text-amber-400 font-medium lowercase">{company?.status || "under review"}</span>.
                                You will be able to post new job openings once our admin team approves your organization.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <Button
                                    size="sm"
                                    variant="bordered"
                                    className="border-neutral-800 text-neutral-400 hover:text-white rounded-xl text-xs font-medium px-4 h-9"
                                    onClick={() => window.location.reload()}
                                >
                                    Check Status
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}