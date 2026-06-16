
import { getUser } from "@/lib/core/session";
import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { LayoutDashboard, Search, Bookmark, FileText, CreditCard } from "lucide-react";

export async function DashboardSideBar() {

    const user = await getUser();

    const requeterNavLinks = [
        { icon: House, label: "Home", link: "/dashboard/requeter" },
        { icon: Magnifier, label: "Jobs", link: "/dashboard/requeter/jobs" },
        { icon: Bell, label: "Create A Job", link: "/dashboard/requeter/jobs/new" },
        { icon: Envelope, label: "Company", link: "/dashboard/requeter/company" },
        { icon: Person, label: "Profile", link: "/dashboard/requeter" },
        { icon: Gear, label: "Settings", link: "/dashboard/requeter" },
    ];

    const seekerNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/seeker" },
        { icon: Magnifier, label: "Jobs", link: "/dashboard/seeker/jobs" },
        { icon: Bookmark, label: "Saved Jobs", link: "/dashboard/seeker/saved-jobs" },
        { icon: FileText, label: "Applications", link: "/dashboard/seeker/applications" },
        { icon: CreditCard, label: "Billing", link: "/dashboard/seeker/billing" },
        { icon: Gear, label: "Settings", link: "/dashboard/seeker/settings" },
    ];

    const navLinksMaping = {
        seeker: seekerNavLinks,
        requeter: requeterNavLinks,

    }
    const navItems = navLinksMaping[user?.role || "seeker"];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link href={item.link}
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                type="button"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden sm:block border-r pr-10 ">
                {navContent}
            </aside>

            <Drawer>
                <Button className="sm:hidden" variant="secondary">
                    <PanelLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}