"use client";

import { useStore } from "@/store/useStore";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function IncidentTable() {
  const { alerts } = useStore();
  const router = useRouter();
  
  // Create some mock extended incidents based on alerts
  const incidents = alerts.length > 0 ? alerts.map(a => ({
    ...a,
    incidentId: `INC-${Math.floor(Math.random() * 10000)}`,
    assignedOfficerId: Math.random() > 0.5 ? "Off. Smith" : "Unassigned"
  })) : [
    { id: "1", incidentId: "INC-9342", cameraId: "cam-01", zoneId: "Zone North", timestamp: new Date().toISOString(), objectType: "Plastic Bottle", confidence: 0.94, status: "Open", assignedOfficerId: "Off. Smith" },
    { id: "2", incidentId: "INC-9341", cameraId: "cam-03", zoneId: "Zone East", timestamp: new Date(Date.now() - 3600000).toISOString(), objectType: "Wrapper", confidence: 0.72, status: "Acknowledged", assignedOfficerId: "Off. Doe" },
    { id: "3", incidentId: "INC-9340", cameraId: "cam-02", zoneId: "Zone North", timestamp: new Date(Date.now() - 7200000).toISOString(), objectType: "Can", confidence: 0.88, status: "Resolved", assignedOfficerId: "Unassigned" },
  ];

  return (
    <div className="bg-card border border-border flex flex-col relative w-full overflow-hidden">
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead className="bg-[hsl(var(--surface-container-low))] text-muted-foreground text-[9px] font-bold uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-4 py-4 w-10 border-r border-border"><CheckSquare size={12} className="opacity-40" /></th>
              <th className="px-4 py-4 border-r border-border">Event Telemetry ID</th>
              <th className="px-4 py-4 border-r border-border">Temporal Offset</th>
              <th className="px-4 py-4 border-r border-border">Sensor Node</th>
              <th className="px-4 py-4 border-r border-border">Classification</th>
              <th className="px-4 py-4 text-center border-r border-border">Security State</th>
              <th className="px-4 py-4 border-r border-border">Tactical Officer</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {incidents.map((incident) => (
              <tr 
                key={incident.id} 
                className="hover:bg-[hsl(var(--surface-container-low))] transition-colors duration-200 cursor-pointer group/row"
                onClick={() => router.push(`/incidents/${incident.incidentId}`)}
              >
                <td className="px-4 py-4 border-r border-border" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded-none border-border text-primary focus:ring-primary/40 bg-card w-3 h-3" />
                </td>
                <td className="px-4 py-4 font-display font-bold text-primary group-hover/row:pl-5 transition-all text-sm border-r border-border">
                  #{incident.incidentId}
                </td>
                <td className="px-4 py-4 text-muted-foreground font-bold tracking-widest text-[9px] border-r border-border uppercase">
                  {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                </td>
                <td className="px-4 py-4 border-r border-border">
                  <div className="font-display font-bold text-[11px] text-foreground uppercase tracking-tight">{incident.cameraId}</div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{incident.zoneId}</span>
                  {/* Sub-label placeholder if needed */}
                </td>
                <td className="px-4 py-4 border-r border-border">
                  <div className="font-display font-bold text-[11px] text-foreground uppercase tracking-tight">{incident.objectType}</div>
                  <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1.5 mt-0.5">
                    <span className="w-1 h-3 bg-muted" />
                    {(incident.confidence * 100).toFixed(1)}% NOMINAL
                  </div>
                </td>
                <td className="px-4 py-4 text-center border-r border-border">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 text-[8px] font-bold uppercase tracking-widest border",
                    incident.status === 'Open' ? "bg-destructive/10 text-destructive border-destructive/40" :
                    incident.status === 'Resolved' ? "bg-success/10 text-success border-success/40" :
                    "bg-primary/10 text-primary border-primary/40"
                  )}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground font-bold tracking-widest text-[9px] border-r border-border uppercase">
                   {incident.assignedOfficerId}
                </td>
                <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <button className="text-[8px] font-bold uppercase tracking-widest bg-card hover:bg-[hsl(var(--surface-container-high))] text-muted-foreground hover:text-primary px-3 py-1.5 border border-border hover:border-primary transition-all">
                    ACKNOWLEDGE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-[hsl(var(--surface-container-low))]">
        <div>TELEMETRY SLICE: <strong className="text-foreground">1</strong> - <strong className="text-foreground">{incidents.length}</strong> {"//"} TOTAL ARCHIVE: <strong className="text-foreground">{incidents.length}</strong></div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-border bg-card hover:bg-[hsl(var(--surface-container-high))] disabled:opacity-30 transition-all text-foreground" disabled>PREV_NODE</button>
          <button className="px-3 py-1 border border-border bg-card hover:bg-[hsl(var(--surface-container-high))] disabled:opacity-30 transition-all text-foreground" disabled>NEXT_NODE</button>
        </div>
      </div>
    </div>
  );
}
