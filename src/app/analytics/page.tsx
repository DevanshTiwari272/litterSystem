import dynamic from "next/dynamic";
import { Download, Filter } from "lucide-react";

const Charts = dynamic(() => import("@/components/analytics/AnalyticsCharts").then(mod => mod.AnalyticsCharts), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-card animate-pulse rounded-lg mt-6" />
});

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary" />
            <h1 className="text-3xl font-display font-bold tracking-tighter uppercase text-foreground">
              SYSTEM_ANALYTICS
            </h1>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-2">
            Telemetry Aggregate // Ref: AURA-992-DELTA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-border bg-card p-4 flex flex-col items-end border-l-4 border-l-primary">
            <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">GLOBAL_STABILITY</span>
            <span className="font-display text-2xl font-bold text-primary">98.4%</span>
          </div>
          <div className="border border-border bg-card p-4 flex flex-col items-end border-l-4 border-l-secondary">
            <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">ACTIVE_THREATS</span>
            <span className="font-display text-2xl font-bold text-secondary">04</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row border border-border bg-card px-6 py-3 gap-6 items-center">
        <div className="flex items-center gap-3 border-r border-border pr-6">
          <Filter size={14} className="text-primary" />
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-foreground">Operational filters:</span>
        </div>
        <div className="flex flex-wrap gap-6 items-center flex-1">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Timeline:</span>
            <select className="bg-transparent border-none text-[10px] font-display font-bold uppercase tracking-widest text-primary focus:ring-0 cursor-pointer hover:text-foreground transition-colors">
              <option>7-Day Horizon</option>
              <option>30-Day Deep Scan</option>
              <option>Monthly Aggregate</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Sector:</span>
            <select className="bg-transparent border-none text-[10px] font-display font-bold uppercase tracking-widest text-primary focus:ring-0 cursor-pointer hover:text-foreground transition-colors">
              <option>Global Surveillance</option>
              <option>Sector Alpha (North)</option>
              <option>Sector Beta (South)</option>
            </select>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <input type="checkbox" id="compare" className="w-3.5 h-3.5 border border-border bg-card text-primary focus:ring-primary/20 cursor-pointer accent-primary" />
            <label htmlFor="compare" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <Download size={12} className="inline mr-1.5 mb-0.5" />
              Export Data
            </label>
          </div>
        </div>
      </div>

      <Charts />
    </div>
  );
}
