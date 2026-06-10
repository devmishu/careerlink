
import { Table, Button } from "@heroui/react";
import { Edit2, Trash2 } from "lucide-react";

export default async  function JobTable ({ jobs }) {

    
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-[#121212] rounded-2xl border border-neutral-800/80 shadow-2xl">
            <Table
                aria-label="Job Openings Table"
                classNames={{
                    base: "overflow-x-auto",
                    wrapper: "bg-transparent shadow-none p-0",
                    th: "bg-[#1c1c1c] text-neutral-400 font-medium text-sm border-b border-neutral-800/60 py-3.5",
                    td: "py-4 text-neutral-200 text-sm border-b border-neutral-900",
                }}
            >
                <Table.ScrollContainer>
                    <Table.Content aria-label="Jobs List" className="min-w-[600px]">
                        <Table.Header>
                            {/* এখানে সব ক্লোজিং ট্যাগ </Table.Column> করা হয়েছে */}
                            <Table.Column isRowHeader className="text-left">JOB TITLE</Table.Column>
                            <Table.Column className="text-left">LOCATION</Table.Column>
                            <Table.Column className="text-left">SALARY</Table.Column>
                            <Table.Column className="text-center w-20">EDIT</Table.Column>
                            <Table.Column className="text-center w-20">DELETE</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {
                                jobs.map(jobData => <Table.Row key={jobData._id} className="hover:bg-neutral-900/40 transition-colors">
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium text-white">{jobData.jobTitle}</span>
                                            <span className="text-xs text-neutral-500 capitalize">{jobData.jobType}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-neutral-300">{jobData.jobLocation}</span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="font-mono text-neutral-300 uppercase">
                                            {jobData.minSalary} - {jobData.maxSalary} {jobData.currency}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell className="text-center">
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </Button>
                                    </Table.Cell>

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
                                </Table.Row>)
                            }


                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}