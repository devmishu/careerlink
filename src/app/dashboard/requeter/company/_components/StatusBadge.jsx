import React from "react";
import { Clock, Check, Xmark } from "@gravity-ui/icons";

export default function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    };

    const icons = {
        Pending: <Clock className="w-3.5 h-3.5 inline mr-1" />,
        Approved: <Check className="w-3.5 h-3.5 inline mr-1" />,
        Rejected: <Xmark className="w-3.5 h-3.5 inline mr-1" />
    };

    const currentStatus = status || "Pending";

    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[currentStatus]}`}>
            {icons[currentStatus]} {currentStatus}
        </span>
    );
}