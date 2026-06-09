"use client";

import React, { useState, useRef } from "react";
import CompanyFormMode from "./CompanyFormMode"; // কাস্টম পাথ দিন
import CompanyViewMode from "./CompanyViewMode"; // কাস্টম পাথ দিন
import { createCompany } from "@/lib/actions/companies";

export default function CompanyProfileManager({requeterId}) {
    const [company, setCompany] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [logoPreview, setLogoPreview] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    const fileInputRef = useRef(null);

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLogoPreview(URL.createObjectURL(file));
        setUploadingLogo(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
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
            status: company ? company.status : "Pending",
            requeterId: requeterId,
        };

        setCompany(companyData);

        createCompany(companyData);

        setIsEditing(false);
        console.log("company...........", companyData);
    };

    // Condition 1: No Company or Currently Editing
    if (!company || isEditing) {
        return (
            <CompanyFormMode
                company={company}
                isEditing={isEditing}
                fileInputRef={fileInputRef}
                logoPreview={logoPreview}
                uploadingLogo={uploadingLogo}
                onLogoChange={handleLogoChange}
                onSubmit={handleSubmit}
                onCancel={() => isEditing && setIsEditing(false)}
            />
        );
    }

    // Condition 2: Registered (View Mode)
    return (
        <CompanyViewMode
            company={company}
            onEdit={() => {
                setLogoPreview(company.logo);
                setIsEditing(true);
            }}
        />
    );
}