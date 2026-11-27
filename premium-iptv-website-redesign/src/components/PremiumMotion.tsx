"use client";

import { useMotionPreference } from "./useMotionPreference";

import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** Motion values update outside React's render cycle. Touch remains a static surface. */
export function MotionSurface({ children, className = "", tilt = false }: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const reduced = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(0, { stiffness: 180, damping: 28 });
  const ry = useSpring(0, { stiffness: 180, damping: 28 });
  const opacity = useSpring(0, { stiffness: 160, damping: 28 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    x.set(event.clientX - rect.left - 240);
    y.set(event.clientY - rect.top - 240);
    opacity.set(1);
    if (tilt) {
      rx.set((.5 - py) * 4);
      ry.set((px - .5) * 4);
    }
  }

  return (
    <motion.div
      className={`motion-surface ${className}`}
      onPointerMove={move}
      onPointerLeave={() => { rx.set(0); ry.set(0); opacity.set(0); }}
      style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformPerspective: 1200 }}
    >
      {children}
      <div aria-hidden="true" className="spotlight-clip">
        <motion.div className="surface-spotlight" style={{ x, y, opacity: reduced ? 0 : opacity }} />
      </div>
    </motion.div>
  );
}

export function AmbientLight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const blue = useAnimationControls();
  const violet = useAnimationControls();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced !== false || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) {
        void blue.start({ x: [0, 50, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, .97, 1], transition: { duration: 22, repeat: Infinity, ease: "easeInOut" } });
        void violet.start({ x: [0, -35, 20, 0], y: [0, 35, -10, 0], transition: { duration: 26, repeat: Infinity, ease: "easeInOut" } });
      } else { blue.stop(); violet.stop(); }
    }, { rootMargin: "100px" });
    observer.observe(node);
    const onVisibility = () => { if (document.hidden) { blue.stop(); violet.stop(); } else { observer.unobserve(node); observer.observe(node); } };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); blue.stop(); violet.stop(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [reduced, blue, violet]);

  return (
    <div ref={ref} className="ambient-light" aria-hidden="true">
      <motion.div className="ambient-orb ambient-orb-blue" animate={blue} />
      <motion.div className="ambient-orb ambient-orb-violet" animate={violet} />
      <div className="orbital-line" />
      <div className="light-grain" />
    </div>
  );
}

export function CinemaArtwork({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 28]);
  return (
    <motion.div ref={ref} className="cinema-artwork" style={{ y: reduced ? 0 : y }}>
      <MotionSurface tilt className="cinema-frame">{children}</MotionSurface>
    </motion.div>
  );
}
