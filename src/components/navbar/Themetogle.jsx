"use client";

import { useTheme } from "next-themes";
import { Check, Power } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    return (
        <Switch 
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        
        >
            {({ isSelected }) => (
                <>
                    <Switch.Control
                        className={`rounded-full h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
                    >
                        <Switch.Thumb
                            className={`rounded-full size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`} 
                        >
                            <Switch.Icon>
                                {isSelected ? (
                                    <Moon className="size-4 text-cyan-600" />
                                ) : (
                                    <Sun className="size-4 text-blue-600" />
                                )} 
                            </Switch.Icon>
                        </Switch.Thumb>
                    </Switch.Control>
                </>
            )}
        </Switch>
    );
}



