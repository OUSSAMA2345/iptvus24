"use client";

import { useMotionPreference } from "./useMotionPreference";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";

/** Visible on the server and without JS; enhancement never gates access to content. */
export default function Reveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const reduced = useMotionPreference();

  useEffect(() => {
    const node = ref.current;
    if (reduced) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      void controls.start({ opacity: [0, 1], y: [20, 0], transition: { duration: .65, delay, ease: [.2, .8, .2, 1] } });
      observer.disconnect();
    }, { threshold: .08 });
    observer.observe(node);
    return () => { observer.disconnect(); controls.stop(); };
  }, [controls, delay, reduced]);

  return <motion.div ref={ref} className={className} initial={false} animate={controls}>{children}</motion.div>;
}
