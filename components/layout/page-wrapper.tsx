"use client";

import { HTMLMotionProps, motion } from "framer-motion";

// Based on nextjs-app-router-page-transitions/src/components/PageWrapper.tsx
export default function PageWrapper(props: HTMLMotionProps<"div">) {
  return (
    <div className="bg-[color:var(--color-background)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        {...props}
      />
    </div>
  );
}

