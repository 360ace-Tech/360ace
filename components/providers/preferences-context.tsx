"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type PreferencesContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  toggleReduceMotion: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const THEME_STORAGE_KEY = "360ace-theme";
const MOTION_STORAGE_KEY = "360ace-reduce-motion";

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSystemReduceMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [reduceMotion, setReduceMotionState] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = storedTheme ?? getSystemTheme();
    setThemeState(initialTheme);

    const storedMotion = window.localStorage.getItem(MOTION_STORAGE_KEY);
    const initialMotion = storedMotion ? storedMotion === "true" : getSystemReduceMotion();
    setReduceMotionState(initialMotion);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.dataset.theme = theme;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.dataset.reduceMotion = reduceMotion ? "true" : "false";
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MOTION_STORAGE_KEY, reduceMotion ? "true" : "false");
    }
  }, [reduceMotion]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setReduceMotion = useCallback((value: boolean) => {
    setReduceMotionState(value);
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setReduceMotionState((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, reduceMotion, setReduceMotion, toggleReduceMotion }),
    [theme, setTheme, toggleTheme, reduceMotion, setReduceMotion, toggleReduceMotion],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}
