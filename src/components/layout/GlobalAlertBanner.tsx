"use client";

import { useStore } from "@/store/useStore";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export function GlobalAlertBanner() {
  const { alerts } = useStore();
  const openAlertsCount = alerts.filter(a => a.status === 'Open').length;
  const [expanded, setExpanded] = useState(false);

  if (openAlertsCount === 0) return null;

  const isCritical = openAlertsCount >= 6;
  const recentAlerts = alerts.filter(a => a.status === 'Open').slice(0, 5);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className={`h-10 flex items-center justify-between px-4 cursor-pointer transition-colors ${
          isCritical ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-warning text-warning-foreground hover:bg-warning/90'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <AlertCircle size={16} />
          <span className="text-sm font-semibold">
            {openAlertsCount} Active Incident{openAlertsCount !== 1 && 's'} Detected
          </span>
        </div>
        <button className="p-1 rounded opacity-80 hover:opacity-100 transition-opacity">
          <ChevronDown size={16} className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {expanded && (
        <div className="bg-card border-b border-border shadow-md">
          <ul className="max-h-64 overflow-y-auto divide-y divide-border">
            {recentAlerts.map(alert => (
              <li key={alert.id} className="p-3 text-sm flex justify-between items-center hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${isCritical ? 'bg-destructive' : 'bg-warning'}`} />
                  <span className="font-medium text-foreground">{alert.objectType}</span>
                  <span className="text-muted-foreground">Camera {alert.cameraId} • {alert.zoneId}</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Moments ago</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
