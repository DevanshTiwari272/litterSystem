"use client";

import { useStore } from "@/store/useStore";
import { AlertCircle, Clock, MapPin, Video } from "lucide-react";

export function AlertTicker() {
  const { alerts } = useStore();
  const unresolvedAlerts = alerts.filter((a) => a.status === "Open").slice(0, 10);

  if (unresolvedAlerts.length === 0) {
    return (
      <div className="w-full bg-card border border-border p-4 flex items-center justify-center text-muted-foreground text-sm border-dashed">
        <AlertCircle className="mr-2 h-4 w-4" /> No unresolved alerts at this time.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-border bg-card border-l-4 border-l-secondary">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-secondary/5">
        <h3 className="text-[11px] font-display font-bold flex items-center gap-2 text-secondary uppercase tracking-widest">
          <AlertCircle className="h-4 w-4" />
          Live Signal Ticker
        </h3>
        <span className="text-[9px] font-bold text-secondary bg-secondary/10 px-3 py-1 border border-secondary/20">
          {unresolvedAlerts.length} Active Reports
        </span>
      </div>

      {/* Scrolling cards */}
      <div className="flex overflow-x-auto p-4 gap-4 custom-scrollbar">
        {unresolvedAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex-shrink-0 w-72 bg-[hsl(var(--surface-container-low))] border border-border border-l-2 border-l-secondary p-4 relative group transition-all duration-200 hover:border-l-primary"
          >
            {/* Top row */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary tracking-widest uppercase">
                <Video className="h-3.5 w-3.5" />
                <span>{alert.cameraId}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                <Clock className="h-3 w-3" />
                <span>Live</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-3">
              <div className="w-16 h-12 bg-muted overflow-hidden flex-shrink-0 border border-border">
                <img
                  src={alert.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <div className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                  {alert.objectType}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{alert.zoneId}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-primary text-primary-foreground hover:opacity-90 text-[10px] font-bold py-2 tracking-widest uppercase transition-all">
                Review
              </button>
              <button className="flex-1 bg-[hsl(var(--surface-container))] text-foreground hover:text-primary text-[10px] font-bold py-2 tracking-widest uppercase transition-all border border-border">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
