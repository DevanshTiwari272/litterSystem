"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Maximize, Mic, MicOff, Settings2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface HLSMediaPlayerProps {
  streamUrl: string;
  cameraId: string;
  zoneId: string;
  showOverlay?: boolean;
}

export function HLSMediaPlayer({ streamUrl, cameraId, zoneId, showOverlay = true }: HLSMediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [overlaysOn, setOverlaysOn] = useState(showOverlay);
  const [hasAlert, setHasAlert] = useState(false); // Simulate random alerts
  
  useEffect(() => {
    let hls: Hls | null = null;
    
    if (videoRef.current) {
      if (Hls.isSupported() && streamUrl.endsWith('.m3u8')) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(console.error);
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoRef.current.src = streamUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play().catch(console.error);
        });
      }
    }

    // Simulate random mock alerts for the UI
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setHasAlert(true);
        setTimeout(() => setHasAlert(false), 5000);
      }
    }, 15000 + Math.random() * 10000);
    
    return () => {
      if (hls) {
        hls.destroy();
      }
      clearInterval(interval);
    };
  }, [streamUrl]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex flex-col w-full h-full bg-slate-950 overflow-hidden rounded-2xl border transition-all duration-500",
        hasAlert ? "border-primary shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "border-white/5"
      )}
    >
      {/* Premium HUD Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>

      {/* Header Bar */}
      <div className="absolute top-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1.5 drop-shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <h4 className="text-white font-display text-lg font-bold tracking-tight">{cameraId}</h4>
          </div>
          <p className="text-primary/80 text-xs font-bold font-sans tracking-wide pl-5 uppercase">{zoneId}</p>
        </div>
        
        <div className="flex flex-col items-end gap-3 text-right">
          <div className="flex gap-2.5">
            {hasAlert && (
              <div className="flex items-center gap-2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-xl shadow-lg shadow-primary/20 animate-pulse">
                SIGNAL ALERT
              </div>
            )}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 text-[10px] text-white/90 font-bold px-4 py-1.5 rounded-xl backdrop-blur-md">
              NOMINAL LINK
            </div>
          </div>
          <div className="font-sans text-[10px] font-bold tracking-wider text-white/50 uppercase">
             94% Integrity // 60 FPS
          </div>
        </div>
      </div>

      {/* Video Stream */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover brightness-95"
        muted={isMuted}
        playsInline
        poster="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />

      {/* Advanced AI HUD Overlays */}
      {overlaysOn && hasAlert && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-48 h-64 transition-all duration-300">
            {/* Target Reticle (Premium) */}
            <div className="absolute inset-0 border-2 border-primary/40 bg-primary/5 rounded-2xl shadow-2xl">
               {/* Label HUD (Premium) */}
               <div className="absolute -top-10 left-0 bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
                 <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                 HUMAN DETECTED // 98%
               </div>
               
               {/* Metadata Column */}
               <div className="absolute -right-28 top-0 flex flex-col gap-1.5">
                 <div className="text-[9px] font-bold text-white bg-slate-950/80 px-3 py-1 rounded-lg border border-white/5 backdrop-blur-md">VEL: 1.2M/S</div>
                 <div className="text-[9px] font-bold text-white bg-slate-950/80 px-3 py-1 rounded-lg border border-white/5 backdrop-blur-md">DIST: 4.8M</div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Metadata HUD */}
      <div className="absolute bottom-12 right-8 z-20 pointer-events-none text-right opacity-40">
        <div className="text-[9px] font-bold text-white font-sans tracking-widest">SENS_ID: CR-0922</div>
        <div className="text-[9px] font-bold text-white font-sans tracking-widest mt-0.5">AUTH_LVL: 4</div>
      </div>

      {/* Control Actions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-black/80 border border-white/5 p-1.5 rounded-xl backdrop-blur-xl opacity-0 hover:opacity-100 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)] border-b-primary/30">
        <div className="flex items-center gap-2 px-4 py-1">
          <button 
            onClick={() => setOverlaysOn(!overlaysOn)}
            className={cn(
              "p-2.5 rounded-lg transition-all",
              overlaysOn ? "text-primary bg-primary/10 shadow-[inner_0_0_10px_rgba(0,242,255,0.2)]" : "text-muted-foreground hover:bg-white/5"
            )}
            title="Toggle AI HUD"
          >
            {overlaysOn ? <Eye size={16} className="drop-shadow-[0_0_8px_#00f2ff]" /> : <EyeOff size={16} />}
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all">
            <Settings2 size={16} />
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button onClick={toggleFullscreen} className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all">
            <Maximize size={16} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(240px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
