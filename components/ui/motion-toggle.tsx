'use client';

import { Accessibility } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useReducedMotionSetting } from '@/components/layout/providers';

export function MotionToggle() {
  const { reduced, toggle } = useReducedMotionSetting();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={reduced}
      aria-label={reduced ? 'Disable reduced motion' : 'Enable reduced motion'}
      onClick={toggle}
    >
      <Accessibility className="h-5 w-5" />
      <span className="sr-only">Toggle reduced motion</span>
    </Button>
  );
}
