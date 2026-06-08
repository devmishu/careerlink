import React from "react";
import { Select, Label, ListBox } from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";

export default function FormSelect({ label, name, placeholder, options, defaultSelectedKeys }) {
    return (
        <Select isRequired name={name} className="w-full flex flex-col" defaultSelectedKeys={defaultSelectedKeys}>
            <Label className="text-neutral-300 text-sm font-medium mb-1.5 text-left block">
                {label}
            </Label>
            <Select.Trigger className="w-full bg-[#1c1c1c] border border-neutral-800 data-[hover=true]:border-neutral-700 rounded-xl h-11 px-3.5 transition-all text-neutral-200 text-sm flex items-center justify-between">
                <Select.Value placeholder={placeholder} />
                <ChevronDown size={16} className="text-neutral-400" />
            </Select.Trigger>
            <Select.Popover className="bg-[#1c1c1c] border border-neutral-800 text-neutral-200 rounded-xl">
                <ListBox className="p-1">
                    {options.map((opt) => (
                        <ListBox.Item id={opt.value} key={opt.value} textValue={opt.label} className="data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                            {opt.label}
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}