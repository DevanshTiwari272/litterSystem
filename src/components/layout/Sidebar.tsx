"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Video,
  FileText,
  BarChart3,
  Camera as CameraIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";

const links = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/live-monitoring", label: "Live Monitoring", icon: Video },
  { href: "/incidents", label: "Incidents", icon: FileText, showBadge: true },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/cameras", label: "Cameras", icon: CameraIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

function LiveClock({ collapsed }: { collapsed: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " UTC"
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (collapsed) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
      <Clock size={12} className="shrink-0" />
      <span>{time}</span>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, alerts } = useStore();
  const openAlertsCount = alerts.filter((a) => a.status === "Open").length;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-500 ease-in-out flex flex-col",
        "bg-[hsl(var(--sidebar-background))] border-r border-border text-sidebar-foreground",
        sidebarCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Header / Brand */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border shrink-0">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center shrink-0">
              <Shield size={16} className="text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-wider text-primary uppercase">
                AURA
              </span>
              <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                Citywide Surveillance
              </p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="mx-auto w-8 h-8 bg-primary flex items-center justify-center">
            <Shield size={16} className="text-primary-foreground" />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 hover:bg-primary/10 transition-all text-muted-foreground hover:text-primary border border-border",
            sidebarCollapsed ? "hidden" : "ml-auto"
          )}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Collapsed expand button */}
      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mx-auto mt-3 p-1.5 hover:bg-primary/10 transition-all text-muted-foreground hover:text-primary border border-border"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-0.5 custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              title={sidebarCollapsed ? link.label : undefined}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 relative",
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary dark:bg-cyan-950/30 dark:text-cyan-400 dark:border-cyan-400"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary border-l-4 border-transparent",
                sidebarCollapsed ? "justify-center px-0" : "justify-start"
              )}
            >
              <link.icon
                className={cn(
                  "shrink-0",
                  sidebarCollapsed ? "mx-auto" : ""
                )}
                size={18}
              />

              {!sidebarCollapsed && (
                <span className="relative z-10 font-display">{link.label}</span>
              )}

              {link.showBadge && openAlertsCount > 0 && !sidebarCollapsed && (
                <span
                  className={cn(
                    "ml-auto flex h-5 min-w-5 items-center justify-center px-1.5 text-[9px] font-bold",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {openAlertsCount > 99 ? "99+" : openAlertsCount}
                </span>
              )}
              {link.showBadge && openAlertsCount > 0 && sidebarCollapsed && (
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-secondary border-2 border-background" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-border">
        {/* System Status */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 space-y-1.5">
            <LiveClock collapsed={sidebarCollapsed} />
            <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-primary">
              <Shield size={12} className="shrink-0" />
              <span>System Secure</span>
            </div>
          </div>
        )}

        {/* Theme toggle */}
        <ThemeToggle collapsed={sidebarCollapsed} />

        {/* Disconnect */}
        <button
          className={cn(
            "flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 px-4 py-3 w-full",
            "text-muted-foreground hover:text-secondary hover:bg-secondary/5 border-t border-border",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}
          title={sidebarCollapsed ? "Disconnect" : undefined}
        >
          <LogOut size={16} className="shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-display">Disconnect</span>
          )}
        </button>
      </div>
    </aside>
  );
}
