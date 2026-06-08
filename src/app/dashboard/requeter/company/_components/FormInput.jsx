import React from "react";
import { Input } from "@heroui/react";

export default function FormInput({ label, ...props }) {
    return (
        <Input
            isRequired
            label={label}
            labelPlacement="outside"
            classNames={{
                label: "text-neutral-300 text-sm font-medium mb-1.5",
                inputWrapper: "bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 group-data-[focus=true]:border-neutral-700 rounded-xl h-11 transition-all",
                input: "text-neutral-200 text-sm placeholder:text-neutral-600",
                ...props.classNames
            }}
            {...props}
        />
    );
}