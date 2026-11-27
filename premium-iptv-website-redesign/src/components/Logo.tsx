import Link from "next/link";
import { cn } from "../utils/cn";
import LogoMark from "./LogoMark";

export default function Logo({ light = false, tagline = false }: { light?: boolean; tagline?: boolean }) {
  return (
    <Link href="/#top" className="group flex items-center gap-3 rounded-lg" aria-label="IPTVUS24 home">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className={cn("font-display text-[1.12rem] font-extrabold tracking-tight", light ? "text-white" : "text-ink")}>
          IPTV<span className="bg-gradient-to-r from-brand to-cyan bg-clip-text text-transparent">US24</span>
        </span>
        {tagline && <span className={cn("mt-1 text-[9px] font-semibold", light ? "text-white/70" : "text-slate-soft")}>Streaming service</span>}
      </span>
    </Link>
  );
}
