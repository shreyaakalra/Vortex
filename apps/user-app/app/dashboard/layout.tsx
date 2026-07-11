"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeIndianRupee,
  House,
  Repeat,
  Search,
  TextAlignJustify,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/dashboard/home", label: "home", icon: House },
  { href: "/dashboard/explore", label: "explore", icon: Search },
  { href: "/dashboard/transfer", label: "transfer", icon: Repeat },
  {
    href: "/dashboard/transactions",
    label: "transactions",
    icon: BadgeIndianRupee,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
  function handleClickOutside(event: any) {
    if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);

  function collapsibleNavbar() {
    setIsOpen(!isOpen);
  }

  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-background">
      <aside
        ref={sidebarRef}
        className={`${isOpen ? "w-80" : "w-18"} border-r border-border px-4 py-6 flex flex-col justify-between shrink-0`}
      >
        {isOpen ? (
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row justify-between px-2 pb-7">
                <Link href={"/"}>
                  <span className="font-display text-2xl font-bold text-foreground">
                    vortex<span className="text-signal">.</span>
                  </span>
                </Link>
                <button onClick={collapsibleNavbar}>
                  <TextAlignJustify />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      onClick={()=>setIsOpen(false)}
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-4 rounded-lg font-mono text-xl/2 transition-colors font-bold ${
                        isActive
                          ? "bg-signal/60 text-signal"
                          : "text-muted hover:text-foreground hover:bg-surface"
                      }`}
                    >
                      <item.icon
                        className="text-sm"
                        size={15}
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2.5 px-2.5 py-2.5">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-mono text-[20px] text-foreground">
                SK
              </div>
              <span className="font-mono text-xs text-muted">account</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="px-2 pb-7">
                <button onClick={collapsibleNavbar}>
                  <TextAlignJustify />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-4 rounded-lg font-mono text-xl/2 transition-colors font-bold ${
                        isActive
                          ? "bg-signal/60 text-signal"
                          : "text-muted hover:text-foreground hover:bg-surface"
                      }`}
                    >
                      <item.icon
                        className="text-sm"
                        size={30}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-mono text-[10px] text-foreground">
                SK
              </div>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
