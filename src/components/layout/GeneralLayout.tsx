"use client";

import { useStore } from "@/store/useStore";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { GlobalAlertBanner } from "./GlobalAlertBanner";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, alerts } = useStore();
  const hasBanner = alerts.some((a) => a.status === "Open");

  return (
    <div className="relative min-h-screen flex text-foreground bg-background overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
      <GlobalAlertBanner />
      <Sidebar />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out relative z-10",
          sidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
        )}
      >
        <div className={cn("transition-all", hasBanner ? "mt-10" : "mt-0")} />
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto mt-16 custom-scrollbar bg-[hsl(var(--surface-container-low))]">
          <div className="p-8">{children}</div>
        </main>
      </div>

      <Toaster position="bottom-right" richColors />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.6);
        }
      `}</style>
    </div>
  );
}
