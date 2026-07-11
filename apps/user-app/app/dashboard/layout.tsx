"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/home", label: "home", icon: "ti-home" },
  { href: "/dashboard/explore", label: "explore", icon: "ti-search" },
  { href: "/dashboard/transfer", label: "transfer", icon: "ti-arrows-exchange" },
  { href: "/dashboard/transactions", label: "transactions", icon: "ti-clock" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-[220px] border-r border-border px-4 py-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="px-2 pb-7">
            <span className="font-display text-lg font-bold text-foreground">
              vortex<span className="text-signal">.</span>
            </span>
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-signal/10 text-signal"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <i className={`ti ${item.icon} text-base`} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 px-2.5 py-2.5">
          <div className="w-[26px] h-[26px] rounded-full bg-surface flex items-center justify-center font-mono text-[10px] text-foreground">
            SK
          </div>
          <span className="font-mono text-xs text-muted">account</span>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}