"use client";

import { Search, Filter, Download } from "lucide-react";

export function IncidentFilters() {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:max-w-xl group">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="SCAN ARCHIVE BY ID, NODE, OR ZONE..."
            className="w-full bg-card border border-border h-10 pl-11 pr-4 text-[10px] font-display font-bold tracking-widest uppercase focus:outline-none focus:border-primary transition-all text-foreground"
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-card text-muted-foreground hover:text-foreground hover:border-border border border-transparent px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all">
            <Download size={12} />
            Export Data
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 border border-transparent text-[9px] font-bold uppercase tracking-widest transition-all">
            <Filter size={12} />
            Advanced Filter
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 text-foreground">
        {[
          "Temporal: 24H",
          "Status: Active",
          "Node: All",
          "Object: Any"
        ].map((label) => (
          <div key={label} className="relative group">
            <select className="bg-[hsl(var(--surface-container-low))] border border-border text-[9px] font-bold uppercase tracking-widest pl-3 pr-8 py-2 text-muted-foreground hover:text-foreground hover:border-primary transition-all appearance-none cursor-pointer focus:outline-none focus:border-primary">
              <option>{label}</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
              <Filter size={10} />
            </div>
          </div>
        ))}
        
        <button className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors ml-auto flex items-center gap-2">
          <span>Clear All Parameters</span>
        </button>
      </div>
    </div>
  );
}
