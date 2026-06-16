import { Table, Button } from "@heroui/react";
import { Eye, Trash2 } from "lucide-react";

export default async function AppliedJobTable({ appliedJobs }) {

    // স্ট্যাটাস অনুযায়ী ব্যাজের কালার সেট করার হেল্পার ফাংশন
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-emerald-950/40 text-emerald-400 border-emerald-800/50";
            case "interview":
                return "bg-amber-950/40 text-amber-400 border-amber-800/50";
            case "rejected":
                return "bg-rose-950/40 text-rose-400 border-rose-800/50";
            default: // pending
                return "bg-neutral-800 text-neutral-400 border-neutral-700/60";
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-[#121212] rounded-2xl border border-neutral-800/80 shadow-2xl">
            <Table
                aria-label="Applied Jobs History Table"
                classNames={{
                    base: "overflow-x-auto",
                    wrapper: "bg-transparent shadow-none p-0",
                    th: "bg-[#1c1c1c] text-neutral-400 font-medium text-sm border-b border-neutral-800/60 py-3.5",
                    td: "py-4 text-neutral-200 text-sm border-b border-neutral-900",
                }}
            >
                <Table.ScrollContainer>
                    <Table.Content aria-label="Applied Jobs List" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-left">COMPANY & JOB</Table.Column>
                            <Table.Column className="text-left">APPLIED DATE</Table.Column>
                            <Table.Column className="text-left">STATUS</Table.Column>
                            <Table.Column className="text-center w-20">VIEW</Table.Column>
                            <Table.Column className="text-center w-20">CANCEL</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {appliedJobs.map((application) => (
                                <Table.Row key={application._id} className="hover:bg-neutral-900/40 transition-colors">
                                    {/* Company & Job Title */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium text-white">{application.jobTitle}</span>
                                            <span className="text-xs text-neutral-500 font-medium tracking-wide">
                                                {application.companyName}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* Applied Date */}
                                    <Table.Cell>
                                        <span className="text-neutral-300 font-mono text-xs">
                                            {application.appliedDate}
                                        </span>
                                    </Table.Cell>

                                    {/* Application Status */}
                                    <Table.Cell>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border uppercase tracking-wider ${getStatusStyle(application.status)}`}>
                                            {application.status || "Pending"}
                                        </span>
                                    </Table.Cell>

                                    {/* View Details Action */}
                                    <Table.Cell className="text-center">
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                                        >
                                            <Eye size={16} />
                                        </Button>
                                    </Table.Cell>

                                    {/* Cancel/Delete Application Action */}
                                    <Table.Cell className="text-center">
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-neutral-500 hover:text-rose-500 hover:bg-rose-950/30 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}