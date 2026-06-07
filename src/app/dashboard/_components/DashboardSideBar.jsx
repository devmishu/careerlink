
import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

export function DashboardSideBar() {
    const navItems = [
        { icon: House, label: "Home", link: "/dashboard/requeter" },
        { icon: Magnifier, label: "Jobs", link: "/dashboard/requeter/jobs" },
        { icon: Bell, label: "Create A Job", link: "/dashboard/requeter/jobs/new" },
        { icon: Envelope, label: "Messages", link: "/dashboard/requeter" },
        { icon: Person, label: "Profile", link: "/dashboard/requeter" },
        { icon: Gear, label: "Settings", link: "/dashboard/requeter" },
    ];

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