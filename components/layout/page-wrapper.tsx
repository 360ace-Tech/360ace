"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { usePreferences } from "@/components/providers/preferences-context";

// Enhanced page transitions with stagger and exit animations
export default function PageWrapper({ children, ...props }: HTMLMotionProps<"div">) {
  const { reduceMotion } = usePreferences();

  // Simplified animation for reduced motion
  if (reduceMotion) {
    return (
      <div className="bg-[color:var(--color-background)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          {...props}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[color:var(--color-background)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
        }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

