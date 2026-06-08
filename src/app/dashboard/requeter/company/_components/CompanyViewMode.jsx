import React from "react";
import { Button } from "@heroui/react";
import { Pencil, Globe, Geo, Persons } from "@gravity-ui/icons";
import StatusBadge from "./StatusBadge"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন

export default function CompanyViewMode({ company, onEdit }) {
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
                            <StatusBadge status={company.status} />
                        </div>
                        <p className="text-sm text-neutral-400 mt-1 capitalize">{company.industry}</p>
                    </div>
                </div>

                <Button
                    onClick={onEdit}
                    className="h-9 px-4 rounded-xl text-xs font-medium text-neutral-300 border border-neutral-800 bg-[#121212] hover:bg-neutral-800 transition-all flex items-center gap-2"
                >
                    <Pencil size={14} /> Edit Profile
                </Button>
            </div>

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

            <div className="pt-6">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">About Company</h3>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {company.description}
                </p>
            </div>
        </div>
    );
} 