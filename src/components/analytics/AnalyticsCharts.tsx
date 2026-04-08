"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';

export function AnalyticsCharts() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <div className="h-[400px] w-full bg-card animate-pulse border border-border mt-6" />;
  const trendData = [
    { name: 'Mon', bottles: 120, wrappers: 80, cans: 45 },
    { name: 'Tue', bottles: 132, wrappers: 90, cans: 55 },
    { name: 'Wed', bottles: 101, wrappers: 85, cans: 40 },
    { name: 'Thu', bottles: 145, wrappers: 110, cans: 60 },
    { name: 'Fri', bottles: 156, wrappers: 115, cans: 55 },
    { name: 'Sat', bottles: 180, wrappers: 140, cans: 75 },
    { name: 'Sun', bottles: 195, wrappers: 156, cans: 85 },
  ];

  const zoneData = [
    { name: 'Zone North', value: 400 },
    { name: 'Zone South', value: 300 },
    { name: 'Zone East', value: 300 },
    { name: 'Zone West', value: 200 },
  ];

  const heatMapData = [
    { hour: '08:00', value: 45 },
    { hour: '09:00', value: 55 },
    { hour: '10:00', value: 80 },
    { hour: '11:00', value: 120 },
    { hour: '12:00', value: 160 },
    { hour: '13:00', value: 110 },
    { hour: '14:00', value: 90 },
    { hour: '15:00', value: 130 },
  ];



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 pb-12">
      <div className="col-span-1 lg:grid-cols-2 lg:col-span-2 border border-border bg-[hsl(var(--surface-container-low))] flex flex-col relative group">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-primary" />
            <h3 className="text-[11px] font-display font-bold uppercase tracking-widest text-foreground">Weekly Detection Telemetry</h3>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <span className="w-1.5 h-1.5 bg-success animate-pulse" />
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Live Feed Status: NOMINAL</span>
          </div>
        </div>
        <div className="p-8">
          <div className="h-[350px] w-full text-foreground">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBottles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWrappers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'inherit', fontWeight: 'bold'}} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'inherit', fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0px', boxShadow: 'none' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontSize: '10px', fontFamily: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}
                  labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold', marginBottom: '4px', fontSize: '11px', fontFamily: 'inherit' }}
                />
                <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', fontFamily: 'inherit', color: 'hsl(var(--muted-foreground))', paddingTop: '20px', textTransform: 'uppercase' }} />
                <Area type="monotone" dataKey="bottles" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorBottles)" />
                <Area type="monotone" dataKey="wrappers" stroke="hsl(var(--secondary))" strokeWidth={2} fillOpacity={1} fill="url(#colorWrappers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border border-border bg-[hsl(var(--surface-container-low))] flex flex-col relative">
        <div className="flex items-center px-6 py-4 border-b border-border bg-card">
           <div className="w-1.5 h-4 bg-primary" />
           <h3 className="text-[11px] font-display font-bold uppercase tracking-widest text-foreground ml-3">Sector Distribution</h3>
        </div>
        <div className="p-6">
          <div className="h-[280px] w-full text-foreground">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="hsl(var(--surface-container-low))"
                  strokeWidth={2}
                >
                  {zoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--muted))', 'hsl(var(--accent))'][index % 4]} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0px', boxShadow: 'none' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontSize: '10px', fontFamily: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', fontFamily: 'inherit', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border border-border bg-[hsl(var(--surface-container-low))] flex flex-col relative">
        <div className="flex items-center px-6 py-4 border-b border-border bg-card">
           <div className="w-1.5 h-4 bg-secondary" />
           <h3 className="text-[11px] font-display font-bold uppercase tracking-widest text-foreground ml-3">Peak Temporal Load</h3>
        </div>
        <div className="p-6 text-foreground">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatMapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'inherit', fontWeight: 'bold'}} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'inherit', fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0px', boxShadow: 'none' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontSize: '10px', fontFamily: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}
                  cursor={{ fill: 'hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 0, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
