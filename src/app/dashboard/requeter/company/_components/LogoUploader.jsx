import React from "react";
import { CloudArrowUpIn } from "@gravity-ui/icons";

export default function LogoUploader({ fileInputRef, onLogoChange, logoPreview, companyLogo, uploadingLogo }) {
    return (
        <div className="flex flex-col">
            <span className="text-neutral-300 text-sm font-medium mb-1.5">Company Logo</span>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onLogoChange}
                accept="image/*"
                className="hidden"
            />
            <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 bg-[#1c1c1c] border border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl p-3 cursor-pointer transition-all h-14"
            >
                <div className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                    {logoPreview || companyLogo ? (
                        <img
                            src={logoPreview || companyLogo}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <CloudArrowUpIn size={16} />
                    )}
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-neutral-200">
                        {uploadingLogo ? "Uploading..." : "Upload Logo"}
                    </span>
                    <span className="text-[10px] text-neutral-500">PNG, JPG up to 5MB</span>
                </div>
            </div>
        </div>
    );
}