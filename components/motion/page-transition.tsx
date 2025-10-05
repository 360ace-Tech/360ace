'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
