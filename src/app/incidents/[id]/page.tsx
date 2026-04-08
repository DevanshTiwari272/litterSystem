"use client";

import { ChevronLeft, Download, MapPin, Clock, Camera, Shield, FileText, CheckCircle2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IncidentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col h-full pb-6 max-w-7xl mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 bg-accent/50 hover:bg-accent rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">#{id}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-destructive/10 text-destructive text-xs font-bold uppercase px-2 py-0.5 rounded">Open</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><Clock size={14} /> 12 minutes ago</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-accent text-foreground hover:bg-accent/80 border border-border px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <CheckCircle2 size={16} /> Mark False Positive
          </button>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <Download size={16} /> Export Evidence ZIP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Evidence Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden bg-black/5 border-2 border-border/50">
            {/* The main evidence image frame */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Incident Evidence" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-[35%] left-[45%] w-32 h-40 border-2 border-destructive bg-destructive/20 z-10 transition-all">
                <span className="absolute -top-6 left-[-2px] bg-destructive text-white text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap">
                  Plastic Bottle 94.2%
                </span>
                <span className="absolute -bottom-6 left-[-2px] bg-warning text-warning-foreground text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap">
                  Throwing Action 88.5%
                </span>
              </div>
            </div>
            <div className="bg-card p-4 border-t border-border flex gap-4">
              <button className="flex-1 bg-accent/50 hover:bg-accent border border-border py-2 rounded font-medium text-sm transition-colors">High-Res Image</button>
              <button className="flex-1 bg-accent/50 hover:bg-accent border border-border py-2 rounded font-medium text-sm transition-colors">Video Clip (-5s to +5s)</button>
            </div>
          </Card>
        </div>

        {/* Right Column - Metadata & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Detection Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <Camera className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">cam-01 (Main Street)</p>
                    <p className="text-xs text-muted-foreground">Coordinates: 51.505, -0.09</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Zone North</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">APLMS Vision v2.1.4</p>
                    <p className="text-xs text-muted-foreground">Confidence: 94.2% (Bottle), 88.5% (Action)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Assignment & Workflow</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Status</label>
                <select className="w-full bg-background border border-input rounded-md text-sm px-3 py-2 text-foreground focus:ring-1 focus:ring-ring">
                  <option>Open</option>
                  <option>Acknowledged</option>
                  <option>Resolved</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Assigned Officer</label>
                <div className="flex gap-2">
                  <select className="flex-1 bg-background border border-input rounded-md text-sm px-3 py-2 text-foreground focus:ring-1 focus:ring-ring">
                    <option>Unassigned</option>
                    <option>Officer John Smith</option>
                    <option>Officer Jane Doe</option>
                  </select>
                  <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-medium text-sm">Assign</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Notes</label>
                <textarea 
                  className="w-full bg-background border border-input rounded-md text-sm px-3 py-2 text-foreground focus:ring-1 focus:ring-ring min-h-[80px]" 
                  placeholder="Add investigation notes..."
                />
                <button className="w-full mt-2 bg-accent hover:bg-accent/80 border border-border text-foreground px-3 py-1.5 rounded-md font-medium text-xs transition-colors">
                  Add Note
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex gap-3 relative">
                  <div className="absolute top-2 left-1.5 bottom-[-16px] w-[1px] bg-border" />
                  <div className="w-3 h-3 rounded-full bg-primary z-10 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Incident Detected</p>
                    <p className="text-xs text-muted-foreground flex justify-between">
                      <span>System</span>
                      <span>12 mins ago</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 relative opacity-50">
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-background z-10 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground italic">Awaiting Acknowledgment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
