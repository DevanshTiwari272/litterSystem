"use client";

import { Search, Video, Wifi, WifiOff } from "lucide-react";

const defaultCamerasSelector = [
  { id: "cam-01", name: "Main Street", zoneId: "Zone North", status: "Online" as const },
  { id: "cam-02", name: "Park Entrance", zoneId: "Zone North", status: "Online" as const },
  { id: "cam-03", name: "Station Square", zoneId: "Zone East", status: "Offline" as const },
  { id: "cam-04", name: "High St Crossing", zoneId: "Zone East", status: "Reconnecting" as const },
  { id: "cam-05", name: "Market Alley 1", zoneId: "Zone South", status: "Online" as const },
];

export function CameraSelector() {
  const cameras = defaultCamerasSelector;

  const groupedCameras = cameras.reduce((acc, cam) => {
    if (!acc[cam.zoneId]) acc[cam.zoneId] = [];
    acc[cam.zoneId].push(cam);
    return acc;
  }, {} as Record<string, typeof cameras>);

  return (
    <div className="w-64 flex flex-col h-full bg-[hsl(var(--surface-container-low))] border-l border-border border-t-2 border-t-primary">
      <div className="p-4 border-b border-border bg-card">
        <h3 className="font-display font-bold uppercase tracking-widest text-[11px] mb-4 text-foreground">
          Camera Inventory
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="SCAN..." 
            className="w-full bg-background border border-border text-[10px] font-bold uppercase tracking-widest py-2 pl-8 pr-2 focus:outline-none focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {Object.entries(groupedCameras).map(([zone, zoneCams]) => (
          <div key={zone} className="mb-6">
            <h4 className="text-[9px] uppercase font-bold text-muted-foreground mb-3 tracking-[0.2em]">{zone}</h4>
            <div className="space-y-1">
              {zoneCams.map(cam => (
                <div 
                  key={cam.id} 
                  className="flex items-center justify-between p-2 hover:bg-card border border-transparent hover:border-border cursor-grab active:cursor-grabbing transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-widest text-foreground uppercase">{cam.name}</span>
                      <span className="text-[8px] font-mono text-muted-foreground mt-0.5 tracking-widest uppercase">{cam.id}</span>
                    </div>
                  </div>
                  {cam.status === 'Online' ? (
                    <Wifi className="w-3 h-3 text-success" />
                  ) : cam.status === 'Offline' ? (
                    <WifiOff className="w-3 h-3 text-destructive" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
