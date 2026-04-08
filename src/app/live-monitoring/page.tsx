"use client";

import { useState } from "react";
import { CameraGrid } from "@/components/monitoring/CameraGrid";
import { CameraSelector } from "@/components/monitoring/CameraSelector";

export default function LiveMonitoringPage() {
  const [layout] = useState<1 | 4 | 9>(1);

  // Mock initial cameras for the grid
  const defaultCameras = [
    { id: "cam-01", name: "Main Street", zoneId: "Zone North", status: "Online" as const, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
    { id: "cam-02", name: "Park Entrance", zoneId: "Zone North", status: "Online" as const, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
    { id: "cam-05", name: "Market Alley 1", zoneId: "Zone South", status: "Online" as const, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
    { id: "cam-06", name: "Market Alley 2", zoneId: "Zone South", status: "Online" as const, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
  ];

  return (
    <div className="flex flex-col h-full gap-6 pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="mb-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary" />
            <h1 className="text-3xl font-display font-bold tracking-tighter uppercase text-foreground">
              LIVE_MONITORING
            </h1>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Subsystems: Nominal // Link status: Active
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-card border border-border text-[9px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-success animate-pulse" />
            SYSTEM UPTIME: 99.8%
          </div>
          <div className="text-[10px] font-display font-bold text-muted-foreground uppercase tracking-widest">
            {new Date().toISOString().split('T')[1].split('.')[0]} UTC
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 gap-6 overflow-hidden min-h-[500px]">
        <div className="flex-1 overflow-hidden bg-black flex flex-col items-center justify-center relative border-border border">
          <CameraGrid cameras={defaultCameras} layout={layout} />
        </div>
        
        <CameraSelector />
      </div>
    </div>
  );
}
