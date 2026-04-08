"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  delta: number;
  isPositiveGood?: boolean;
  className?: string;
  progress?: number;
  accent?: "primary" | "secondary" | "muted";
}

export function KPICard({
  title,
  value,
  delta,
  isPositiveGood = true,
  className,
  progress,
  accent = "primary",
}: KPICardProps) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;
  const isGood = isPositiveGood ? isPositive : !isPositive;

  const accentClass = {
    primary: "border-primary",
    secondary: "border-secondary",
    muted: "border-muted-foreground",
  }[accent];

  const trendColor = isNeutral
    ? "text-muted-foreground"
    : isGood
    ? "text-primary"
    : "text-secondary";

  return (
    <div
      className={cn(
        "bg-card border-b-2 border-border flex flex-col gap-2 p-6 relative overflow-hidden transition-all duration-200 group",
        `border-l-0 border-r-0 border-t-0`,
        accentClass.replace("border-", "border-b-"),
        className
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-0.5",
          accent === "primary"
            ? "bg-primary"
            : accent === "secondary"
            ? "bg-secondary"
            : "bg-muted-foreground"
        )}
      />

      {/* Title */}
      <span className="font-display font-bold text-[10px] tracking-widest text-muted-foreground uppercase pl-3">
        {title}
      </span>

      {/* Value */}
      <h3 className="font-display text-4xl font-black text-foreground pl-3 group-hover:text-primary transition-colors duration-300">
        {value}
      </h3>

      {/* Delta */}
      <div className="flex items-center gap-2 pl-3">
        <div
          className={cn(
            "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
            trendColor
          )}
        >
          {isNeutral ? (
            <Minus size={10} />
          ) : isPositive ? (
            <TrendingUp size={10} />
          ) : (
            <TrendingDown size={10} />
          )}
          {Math.abs(delta)}%
        </div>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
          vs last 24h
        </span>
      </div>

      {/* Optional progress bar */}
      {progress !== undefined && (
        <div className="h-1 w-full bg-muted mt-2">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-out",
              accent === "primary"
                ? "bg-primary"
                : accent === "secondary"
                ? "bg-secondary"
                : "bg-muted-foreground"
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
