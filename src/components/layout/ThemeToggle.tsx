"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  collapsed?: boolean;
}

export function ThemeToggle({ collapsed }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      aria-label="Toggle light or dark theme"
      className={cn(
        "flex items-center gap-3 text-xs font-bold tracking-widest transition-all duration-200",
        "px-4 py-3 w-full",
        "text-muted-foreground hover:text-primary",
        "hover:bg-primary/5",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      {isDark ? (
        <Sun size={16} className="shrink-0 text-primary" />
      ) : (
        <Moon size={16} className="shrink-0 text-primary" />
      )}
      {!collapsed && (
        <span className="uppercase font-bold tracking-widest text-[11px]">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
