"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { heroCinemaLiving, reviewsStadiumAtmosphere } from "../assets";
import { useMotionPreference } from "./useMotionPreference";

/** A bounded, offscreen-paused float. Perspective is on the parent, not animated blur. */
export function FloatLayer({ children, className, reverse = false }: {
  children: ReactNode;
  className: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const reduced = useMotionPreference();

  useEffect(() => {
    const node = ref.current;
    if (reduced) { controls.set({ y: 0 }); return; }
    if (!node || typeof IntersectionObserver === "undefined") return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden) {
        void controls.start({ y: [0, reverse ? 9 : -9, 0], transition: { duration: reverse ? 9 : 11, repeat: Infinity, ease: "easeInOut" } });
      } else controls.stop();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); controls.stop(); document.removeEventListener("visibilitychange", update); };
  }, [controls, reduced, reverse]);

  return <motion.div ref={ref} className={className} initial={false} animate={controls}>{children}</motion.div>;
}

/** Original imagery and abstract UI only: no catalogue, playback or availability claims. */
export function HeroDepthLayers() {
  return (
    <div className="depth-layers" aria-hidden="true">
      <div className="scene-reflection">
        <Image src={heroCinemaLiving} alt="" aria-hidden="true" width={1264} height={848} quality={65} sizes="(max-width: 639px) 1px, 600px" />
      </div>
      <div className="scene-backplate" />
      <div className="scene-contact-shadow" />
      <div className="scene-floor" />
      <div className="scene-light-beam scene-light-beam-one" />
      <div className="scene-light-beam scene-light-beam-two" />
      <FloatLayer className="depth-film-panel" reverse>
        <div className="film-panel-glass">
          <Image src={reviewsStadiumAtmosphere} alt="" aria-hidden="true" width={400} height={218} sizes="180px" className="depth-film-image" />
          <div className="abstract-timeline"><i /><i /><i /></div>
        </div>
      </FloatLayer>
      <FloatLayer className="depth-phone-panel">
        <div className="device-phone">
          <div className="phone-camera" />
          <div className="phone-screen">
            <Image src="/images/phone-landscape.jpg" alt="" aria-hidden="true" fill sizes="120px" quality={85} className="phone-landscape" />
            <div className="phone-screen-shade" />
            <div className="abstract-play"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="m9 6 9 6-9 6Z" /></svg></div>
            <div className="phone-tiles"><i /><i /><i /><i /></div>
          </div>
        </div>
      </FloatLayer>
      <FloatLayer className="depth-control-panel" reverse>
        <div className="glass-control">
          <span className="control-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 6 9 6-9 6Z" /></svg></span>
          <div className="control-lines"><i /><i /></div>
          <div className="control-equalizer"><i /><i /><i /><i /><i /></div>
        </div>
      </FloatLayer>
    </div>
  );
}

export function DeviceDepthLayers() {
  return (
    <div className="device-depth-layers" aria-hidden="true">
      <div className="device-orbit device-orbit-one" />
      <div className="device-orbit device-orbit-two" />
      <div className="device-pedestal" />
      <FloatLayer className="device-satellite satellite-one"><span className="satellite-screen"><i /></span></FloatLayer>
      <FloatLayer className="device-satellite satellite-two" reverse><span className="satellite-mobile"><i /></span></FloatLayer>
    </div>
  );
}
