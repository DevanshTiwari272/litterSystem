"use client";

import { useState, useEffect } from "react";

import { OverviewKPIs } from "@/components/dashboard/OverviewKPIs";
import { AlertTicker } from "@/components/dashboard/AlertTicker";
import { LiveHotspotMap } from "@/components/dashboard/LiveHotspotMap";
import { RecentIncidentsTable } from "@/components/dashboard/RecentIncidentsTable";

export default function OverviewPage() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toISOString().split('T')[1].split('.')[0] + " UTC");
    const interval = setInterval(() => {
      setTime(new Date().toISOString().split('T')[1].split('.')[0] + " UTC");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary" />
            <h1 className="text-3xl font-display font-bold tracking-tighter text-foreground uppercase">
              OVERVIEW_CONSOLE
            </h1>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            Surveillance Cluster // Sector Alpha-1
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-bold tracking-widest text-primary uppercase font-display">
            <span className="w-1.5 h-1.5 bg-primary" />
            Active Sensors: <span className="text-foreground">45</span>
          </div>
          {time && (
            <div className="flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase font-display">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
              {time}
            </div>
          )}
        </div>
      </div>
      
      <OverviewKPIs />
      
      <AlertTicker />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px] lg:h-[500px]">
        <div className="lg:col-span-2 h-full">
          <LiveHotspotMap />
        </div>
        <div className="h-full">
          <RecentIncidentsTable />
        </div>
      </div>
    </div>
  );
}
