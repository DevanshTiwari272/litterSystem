"use client";

import { useStore } from "@/store/useStore";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { sidebarCollapsed } = useStore();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b border-border bg-background flex items-center justify-between px-6 transition-all duration-500 ease-in-out",
        sidebarCollapsed ? "left-[80px]" : "left-[280px]"
      )}
    >
      {/* Search */}
      <div className="flex-1 flex items-center">
        <div className="relative flex items-center max-w-sm w-full">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="QUERY_SENTINEL..."
            className={cn(
              "h-9 w-full border border-border bg-[hsl(var(--surface-container-low))] pl-10 pr-4",
              "text-[11px] font-bold tracking-widest uppercase font-display",
              "placeholder:text-muted-foreground/50",
              "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-primary transition-all border border-transparent hover:border-border">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-secondary border border-background" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-border pl-5">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[11px] font-display font-bold text-foreground tracking-tight uppercase">
              Jane Cooper
            </span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
              Operational Tier 4
            </span>
          </div>
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-display font-bold">
              JC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
