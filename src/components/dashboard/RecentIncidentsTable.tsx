"use client";

import { useStore } from "@/store/useStore";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export function RecentIncidentsTable() {
  const { alerts } = useStore();
  const recentIncidents = alerts.slice(0, 5);

  return (
    <div className="bg-card border border-border h-full flex flex-col border-l-2 border-l-primary">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-[hsl(var(--surface-container-low))]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary" />
          <h3 className="font-display text-[11px] font-bold text-primary uppercase tracking-widest">
            REAL_TIME_ACTIVITY_LOG
          </h3>
        </div>
        <button className="text-[9px] font-bold text-primary hover:opacity-70 transition-all border-b border-primary uppercase tracking-widest">
          Download Log
        </button>
      </div>

      {recentIncidents.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/60 p-8 text-sm gap-4">
          <div className="w-12 h-12 border border-border flex items-center justify-center">
            <span className="w-2 h-2 bg-muted-foreground/20" />
          </div>
          No active telemetry recorded.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex gap-4 p-3 hover:bg-[hsl(var(--surface-container-low))] transition-colors group"
            >
              <span className="font-display text-[10px] text-muted-foreground font-bold mt-0.5 shrink-0">
                {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
              </span>
              <div>
                <h4 className="font-display text-[11px] font-black text-primary tracking-widest mb-1 uppercase">
                  {incident.cameraId}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {incident.objectType} detected in {incident.zoneId} &mdash;{" "}
                  <span
                    className={cn(
                      "font-bold",
                      incident.confidence > 0.9 ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {(incident.confidence * 100).toFixed(0)}% confidence
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 bg-[hsl(var(--surface-container-low))] border-t border-border flex justify-between items-center">
        <span className="text-[9px] font-display font-black text-muted-foreground uppercase tracking-widest">
          End of stream
        </span>
        <span className="text-[9px] font-display font-bold text-primary uppercase tracking-widest">
          v4.8.1-STABLE
        </span>
      </div>
    </div>
  );
}
