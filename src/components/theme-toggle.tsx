"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark";

type ThemeToggleProps = {
  initialTheme: ThemeMode;
};

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_COOKIE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme-change";

function readThemeFromDocument(initialTheme: ThemeMode): ThemeMode {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return initialTheme;
  }

  const root = document.documentElement;

  if (root.classList.contains("light")) {
    return "light";
  }

  if (root.classList.contains("dark")) {
    return "dark";
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return initialTheme;
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleThemeChange = () => {
    callback();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_EVENT, handleThemeChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_EVENT, handleThemeChange);
  };
}

export function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => readThemeFromDocument(initialTheme),
    () => initialTheme,
  );
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Activer le theme ${nextTheme}`}
      onClick={() => {
        const updatedTheme = theme === "dark" ? "light" : "dark";
        applyTheme(updatedTheme);
      }}
      className={cn(
        "fixed top-4 right-4 z-50 inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium shadow-[0_20px_60px_rgba(2,8,23,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 sm:top-5 sm:right-5 sm:h-12",
        theme === "light"
          ? "border-slate-300/85 bg-white/92 text-slate-900 hover:border-slate-400 hover:bg-white"
          : "border-white/10 bg-slate-950/75 text-slate-100 hover:border-cyan-300/30 hover:text-white",
      )}
    >
      {theme === "dark" ? (
        <SunMedium className="size-4" />
      ) : (
        <MoonStar className="size-4" />
      )}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}