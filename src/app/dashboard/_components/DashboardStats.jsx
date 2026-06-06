import { RoleCard } from "@/components/role-card/RoleCard";

export default function DashboardStats({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 py-8">
            {stats && stats.map((stat) => (
                <RoleCard
                    key={stat.id || stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    onClick={() => alert(`${stat.title} clicked!`)}
                />
            ))}
        </div>
    );
}