"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "francyaraujo-theme";
const modes = ["system", "dark", "light"] as const;

function isColorSchemePreference(
  value: string | null,
): value is ColorSchemePreference {
  return value !== null && modes.some((mode) => mode === value);
}

function readStoredMode(): ColorSchemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY);
  return isColorSchemePreference(storedMode) ? storedMode : "system";
}

function subscribeToClient() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function applyTheme(mode: ColorSchemePreference) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = mode === "dark" || (mode === "system" && prefersDark);
  const classList = document.documentElement.classList;

  classList.toggle("dark", isDark);
  classList.toggle("light", !isDark);
  document.documentElement.dataset.mode = mode;
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

export function useTheme() {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [mode, setMode] = useState<ColorSchemePreference>(readStoredMode);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => applyTheme(mode);

    window.localStorage.setItem(STORAGE_KEY, mode);
    syncTheme();

    if (mode === "system") {
      mediaQuery.addEventListener("change", syncTheme);
      return () => mediaQuery.removeEventListener("change", syncTheme);
    }
  }, [isClient, mode]);

  const handleModeSwitch = () => {
    setMode((currentMode) => {
      const currentIndex = modes.indexOf(currentMode);
      return modes[(currentIndex + 1) % modes.length] ?? "system";
    });
  };

  return { handleModeSwitch, isClient, mode };
}
