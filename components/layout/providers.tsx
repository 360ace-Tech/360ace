'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

type ReducedMotionContextValue = {
  reduced: boolean;
  toggle: () => void;
};

const ReducedMotionContext = React.createContext<ReducedMotionContextValue | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReducedMotionProvider>{children}</ReducedMotionProvider>
    </ThemeProvider>
  );
}

function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const mediaQuery = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = React.useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(mediaQuery).matches,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(mediaQuery);
    const listener = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };
    mq.addEventListener('change', listener);
    setReduced(mq.matches);
    return () => {
      mq.removeEventListener('change', listener);
    };
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    if (reduced) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }
  }, [reduced]);

  const toggle = React.useCallback(() => {
    setReduced((prev) => !prev);
  }, []);

  const value = React.useMemo(() => ({ reduced, toggle }), [reduced, toggle]);

  return <ReducedMotionContext.Provider value={value}>{children}</ReducedMotionContext.Provider>;
}

export function useReducedMotionSetting() {
  const context = React.useContext(ReducedMotionContext);
  if (!context) {
    throw new Error('useReducedMotionSetting must be used within ReducedMotionProvider');
  }
  return context;
}
