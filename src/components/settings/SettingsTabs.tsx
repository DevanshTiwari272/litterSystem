"use client";

import { useState } from "react";
import { Users, Bell, Map, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "User Management", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "zones", label: "Zone Management", icon: Map },
    { id: "system", label: "System Config", icon: Settings2 },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-220px)]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 flex flex-col gap-2 border-r border-border pr-6 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-[11px] font-display font-bold uppercase tracking-widest transition-all duration-200 border-l-4",
              activeTab === tab.id
                ? "bg-primary/10 text-primary border-primary"
                : "text-muted-foreground border-transparent hover:bg-[hsl(var(--surface-container-low))] hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <tab.icon size={16} className="shrink-0" />
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div className="w-1.5 h-1.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar border border-border bg-card p-8">
        {activeTab === "users" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-6 bg-primary" />
                <h2 className="text-xl font-display font-bold text-foreground tracking-tight uppercase">
                  Personnel Directory
                </h2>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">
                Manage authorization levels and credentials for the surveillance cluster sectors.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { id: "admin-01", name: "Jane Cooper", initials: "JC", status: "Online", email: "j.cooper@aura.ops", tier: "Level 4" },
                  { id: "admin-02", name: "Rex Commander", initials: "RC", status: "Away", email: "rex.c@surveil.cmd", tier: "Level 5" },
                  { id: "admin-03", name: "Sarah Chen", initials: "SC", status: "Offline", email: "s.chen@network.ops", tier: "Level 2" },
                ].map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between bg-[hsl(var(--surface-container-low))] p-5 border border-border border-l-2 border-l-primary group/user transition-all"
                  >
                    <div className="flex items-center gap-6 mb-4 lg:mb-0">
                      <div className="h-12 w-12 bg-muted border border-border text-foreground flex items-center justify-center font-display font-bold text-lg">
                        {user.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-display font-bold text-sm text-foreground tracking-tight uppercase">
                            {user.name}
                          </p>
                          <span
                            className={cn(
                              "text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border",
                              user.status === "Online"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : user.status === "Away"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                : "bg-muted text-muted-foreground border-border"
                            )}
                          >
                            {user.status}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <div className="hidden sm:block mr-2">
                        <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                          {user.tier}
                        </span>
                      </div>
                      <button className="flex-1 lg:flex-none bg-card hover:border-primary text-foreground text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 border border-border transition-all">
                        Registry
                      </button>
                      <button className="flex-1 lg:flex-none bg-card hover:border-primary text-foreground text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 border border-border transition-all">
                        Activity
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-start">
                <button className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 px-8 py-3 text-[11px] uppercase tracking-widest font-bold transition-all">
                  Provision New Link
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-6 bg-primary" />
                <h2 className="text-xl font-display font-bold text-foreground tracking-tight uppercase">
                  Alert Protocols
                </h2>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">
                System notification overrides and relay configurations
              </p>

              <div className="space-y-4 max-w-3xl">
                {[
                  { title: "Standard Signal Relay", desc: "Redundant satellite relay for primary telemetry streams." },
                  { title: "Priority SMS Override", desc: "Instant mobile alerts for high-clearance security incidents." },
                  { title: "Ambient Noise Suppression", desc: "Filter out low-confidence sensor data during active cycles." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-5 border border-border bg-[hsl(var(--surface-container-low))] transition-all"
                  >
                    <div>
                      <p className="font-display font-bold text-xs text-foreground tracking-wide uppercase">
                        {item.title}
                      </p>
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id={`toggle-${idx}`}
                        defaultChecked={idx < 2}
                      />
                      <label
                        htmlFor={`toggle-${idx}`}
                        className="w-10 h-5 bg-muted border border-border block cursor-pointer transition-all peer-checked:bg-primary/20 peer-checked:border-primary relative"
                      >
                        <div className="absolute top-1 left-1 w-3 h-3 bg-muted-foreground transition-all peer-checked:bg-primary peer-checked:left-6" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "zones" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-6 bg-primary" />
                <h2 className="text-xl font-display font-bold text-foreground tracking-tight uppercase">
                  Sector Management
                </h2>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">
                Configuration of node clusters and independent sectors
              </p>

              <div className="border border-border bg-card">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[hsl(var(--surface-container-low))] text-muted-foreground text-[9px] font-bold uppercase tracking-widest border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Sector ID</th>
                      <th className="px-6 py-4">Device Count</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-[11px] font-bold tracking-widest">
                    <tr className="hover:bg-[hsl(var(--surface-container-low))] transition-colors group/row">
                      <td className="px-6 py-4 font-display font-bold text-sm text-foreground uppercase">
                        Aura_Alpha_01
                      </td>
                      <td className="px-6 py-4 text-primary uppercase">
                        12 Connected Sensors
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-primary hover:opacity-70 transition-all uppercase underline underline-offset-4">
                          Configure
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[hsl(var(--surface-container-low))] transition-colors group/row">
                      <td className="px-6 py-4 font-display font-bold text-sm text-foreground uppercase">
                        Aura_Beta_04
                      </td>
                      <td className="px-6 py-4 text-primary uppercase">
                        8 Connected Sensors
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-primary hover:opacity-70 transition-all uppercase underline underline-offset-4">
                          Configure
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-8 animate-in fade-in duration-300 h-full flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-6 bg-primary" />
                <h2 className="text-xl font-display font-bold text-foreground tracking-tight uppercase">
                  System Engine
                </h2>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">
                Core process telemetry and live console
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[hsl(var(--surface-container-low))] border border-border border-t-2 border-t-primary p-6 relative">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-5 font-display">
                    Optimization Heuristics
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-foreground uppercase mb-2 block tracking-widest">
                        Inference Engine v4.2
                      </label>
                      <div className="h-1.5 w-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "84%" }} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Node Load: 42%</span>
                      <span className="text-primary">Status: Operational</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[hsl(var(--surface-container-low))] border border-border border-t-2 border-t-secondary p-6 relative">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-5 font-display">
                    Security Handshake
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 text-secondary border border-border bg-card flex items-center justify-center">
                        <Settings2 size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-foreground tracking-widest uppercase">
                          Active Encryption
                        </p>
                        <p className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                          Rotating Keys // Secure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Console */}
              <div className="flex-1 bg-black text-white border border-border flex flex-col min-h-[300px]">
                <div className="px-5 py-3 border-b border-white/20 bg-black flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-emerald-500">
                      SYS_CONSOLE
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">
                    Aura-4.0.1-Kernel
                  </span>
                </div>

                <div className="flex-1 p-6 font-mono text-[11px] sm:text-xs space-y-2 overflow-y-auto custom-scrollbar leading-relaxed">
                  <p className="text-white/50">[00:00:00] Initializing Aura Surveillance Kernel...</p>
                  <p className="text-white/50">[00:00:12] Mounting encrypted storage clusters...</p>
                  <p className="text-emerald-400">[00:00:45] Secure link established with Region Alpha-1</p>
                  <p className="text-white/50">[00:01:09] Primary sensors reporting 100% operational status.</p>
                  <p className="text-white font-bold tracking-tight">
                    {`> `}Executing system_directive --AURA_TACTICAL_REDESIGN --HIGH_READABILITY=TRUE
                  </p>
                  <span className="inline-block w-2.5 h-4 bg-emerald-500 ml-1 translate-y-0.5 animate-pulse" />
                </div>

                <div className="px-6 py-3 border-t border-white/20 bg-[#0a0a0a] flex gap-6">
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest font-mono">
                    CPU: 14%
                  </span>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest font-mono">
                    MEM: 2.4GB
                  </span>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest font-mono">
                    TPS: 1,240
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-secondary/5 border border-secondary/10 text-[9px] font-bold text-secondary text-center uppercase tracking-widest">
                System modifications restricted to verifiable tier-4 personnel.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
