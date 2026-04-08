import { cn } from "@/lib/utils";

export function LiveHotspotMap() {
  return (
    <div className="premium-card aura-border overflow-hidden h-full flex flex-col relative group">
      {/* Subtle Geometric Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/5 relative z-20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          <h3 className="font-display text-lg font-bold text-foreground tracking-tight">Network Topology</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-primary/60 tracking-wider hidden sm:block font-display">
            REGION: SECTOR_ALPHA
          </div>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground focus:outline-none focus:border-primary/50 transition-all">
            <option>Primary Node</option>
            <option>Secondary Node</option>
          </select>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="flex-1 relative overflow-hidden bg-slate-900/10">
        {/* Connection Web (Geometric) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[120%] h-[120%] border border-primary/20 rounded-full rotate-45" />
          <div className="absolute w-[80%] h-[80%] border border-primary/10 rounded-full -rotate-12" />
          <div className="absolute w-[40%] h-[40%] border border-primary/5 rounded-full rotate-180" />
        </div>

        {/* Dynamic Nodes */}
        {[
          { id: 'Sensor 01', top: '25%', left: '30%', status: 'nominal' },
          { id: 'Sensor 02', top: '65%', left: '45%', status: 'alert' },
          { id: 'Sensor 03', top: '40%', left: '75%', status: 'nominal' },
          { id: 'Sensor 04', top: '80%', left: '20%', status: 'offline' },
          { id: 'Sensor 05', top: '15%', left: '60%', status: 'nominal' },
        ].map((node) => (
          <div 
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/node"
            style={{ top: node.top, left: node.left }}
          >
            <div className={cn(
              "w-4 h-4 rounded-full border-2 border-slate-950 relative z-10 cursor-pointer transition-all duration-500 hover:scale-150",
              node.status === 'nominal' ? 'bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 
              node.status === 'alert' ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]' :
              'bg-slate-700 shadow-[0_0_10px_rgba(51,65,85,0.5)]'
            )} />
            
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 py-2 px-3 rounded-xl border border-white/5 opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none z-30 shadow-2xl">
              <p className="text-xs font-bold font-display text-foreground tracking-wide">{node.id}</p>
              <p className="text-[10px] font-medium text-muted-foreground mt-0.5">Status: {node.status.toUpperCase()}</p>
            </div>
            
            {/* Subtle Node Connector Lines */}
            <div className="absolute top-1/2 left-1/2 w-48 h-[1px] bg-gradient-to-r from-primary/20 to-transparent -rotate-12 origin-left pointer-events-none opacity-50" />
          </div>
        ))}

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3 pointer-events-none">
          <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-bold text-foreground/80 font-display">NOMINAL</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-foreground/80 font-display">ALERT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
