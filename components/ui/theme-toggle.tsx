'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  const handleClick = React.useCallback(() => {
    setTheme(nextTheme);
  }, [setTheme, nextTheme]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Activate ${nextTheme} mode`}
      onClick={handleClick}
    >
      {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
