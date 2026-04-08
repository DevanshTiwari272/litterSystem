"use client";

import { useStore } from "@/store/useStore";
import { Camera } from "@/types";
import { Search, Plus, Edit, Trash2, Video, Activity, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockCameras: Camera[] = [
  { id: "cam-01", name: "Main Street", zoneId: "Zone North", status: "Online", streamUrl: "rtsp://..." },
  { id: "cam-02", name: "Park Entrance", zoneId: "Zone North", status: "Online", streamUrl: "rtsp://..." },
  { id: "cam-03", name: "Station Square", zoneId: "Zone East", status: "Offline", streamUrl: "rtsp://..." },
  { id: "cam-04", name: "High St Crossing", zoneId: "Zone East", status: "Reconnecting", streamUrl: "rtsp://..." },
  { id: "cam-05", name: "Market Alley 1", zoneId: "Zone South", status: "Online", streamUrl: "rtsp://..." },
];

export function CameraInventory() {
  const cameras = useStore((state) => (state as unknown as { cameras: Camera[] }).cameras) || mockCameras;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[hsl(var(--surface-container-low))] border border-border border-t-2 border-t-primary p-6 flex items-center justify-between relative group">
          <div>
            <p className="text-[9px] font-display font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Authenticated Nodes
            </p>
            <p className="text-3xl font-display font-black text-foreground">45</p>
          </div>
          <div className="h-10 w-10 bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
            <Video size={20} />
          </div>
        </div>
        
        <div className="bg-[hsl(var(--surface-container-low))] border border-border border-t-2 border-t-secondary p-6 flex items-center justify-between relative group">
          <div>
            <p className="text-[9px] font-display font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Operational Uptime
            </p>
            <p className="text-3xl font-display font-black text-secondary">99.8%</p>
          </div>
          <div className="h-10 w-10 bg-card border border-border flex items-center justify-center text-secondary group-hover:bg-secondary/5 transition-colors">
            <Activity size={20} />
          </div>
        </div>

        <div className="bg-[hsl(var(--surface-container-low))] border border-border border-t-2 border-t-primary p-6 flex flex-col justify-center relative group">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-display font-bold text-muted-foreground uppercase tracking-widest">
              Stream Integrity
            </span>
            <span className="font-display font-black text-xs text-primary">
              42/45 NODES
            </span>
          </div>
          <div className="h-1 w-full bg-muted overflow-hidden border border-border">
            <div className="h-full bg-primary" style={{ width: '93%' }} />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border border-l-2 border-l-primary flex flex-col relative">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[hsl(var(--surface-container-low))]">
          <div className="relative w-full sm:max-w-md group/search text-foreground">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="SCAN SENSOR REGISTRY..."
              className="w-full bg-card border border-border h-10 pl-11 pr-4 text-[10px] font-display font-bold tracking-widest uppercase focus:outline-none focus:border-primary transition-all"
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-primary group-focus-within/search:w-full transition-all duration-300" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-6 py-2 h-10 text-[10px] font-display font-bold uppercase tracking-widest transition-all w-full sm:w-auto justify-center">
            <Plus size={14} />
            Initialize New Node
          </button>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[hsl(var(--surface-container-low))] text-muted-foreground text-[9px] font-bold uppercase tracking-widest border-b border-border">
              <tr>
                <th className="px-6 py-4 border-r border-border">Sensor Hardware Specs</th>
                <th className="px-6 py-4 border-r border-border">Sector Allocation</th>
                <th className="px-6 py-4 border-r border-border">Telemetry Endpoint</th>
                <th className="px-6 py-4 border-r border-border text-center">Protocol Status</th>
                <th className="px-6 py-4 text-right">Admin Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-[11px] uppercase tracking-wider font-bold">
              {cameras.map((cam) => (
                <tr key={cam.id} className="hover:bg-[hsl(var(--surface-container-low))] transition-colors group/row">
                  <td className="px-6 py-4 border-r border-border">
                    <div className="font-display font-bold text-xs text-foreground flex items-center gap-2 uppercase tracking-tighter">
                      <div className={cn(
                        "w-1.5 h-1.5",
                        cam.status === 'Online' ? 'bg-success' : 
                        cam.status === 'Offline' ? 'bg-destructive' : 'bg-warning'
                      )} />
                      {cam.name}
                    </div>
                    <div className="text-[9px] text-muted-foreground mt-1 tracking-widest font-bold">
                      UUID: {cam.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-[10px] border-r border-border">
                    {cam.zoneId}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-[9px] truncate max-w-[200px] border-r border-border" title={cam.streamUrl}>
                    {cam.streamUrl}
                  </td>
                  <td className="px-6 py-4 text-center border-r border-border">
                    {cam.status === 'Online' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] border border-success bg-success/10 text-success tracking-widest uppercase">
                        <Wifi size={10}/> NOMINAL
                      </span>
                    ) : cam.status === 'Offline' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] border border-destructive bg-destructive/10 text-destructive tracking-widest uppercase">
                        <WifiOff size={10}/> DISCONNECTED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] border border-warning bg-warning/10 text-warning tracking-widest uppercase animate-pulse">
                        <AlertTriangle size={10}/> RE-SYNCING
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all">
                      <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-[hsl(var(--surface-container-high))] border border-transparent hover:border-primary transition-all" title="Modify Configuration">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-secondary hover:bg-[hsl(var(--surface-container-high))] border border-transparent hover:border-secondary transition-all" title="Decommission Node">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-[hsl(var(--surface-container-low))]">
           <div>HARDWARE_REGISTRY_V2.4 // TOTAL_ACTIVE_NODES: <strong className="text-foreground">45</strong></div>
           <div className="flex items-center gap-2 opacity-80 text-foreground">
             <span className="w-1.5 h-1.5 bg-success animate-pulse" />
             CORE_SYNC_ACTIVE
           </div>
        </div>
      </div>
    </div>
  );
}
