/*
 * Inline IPTVUS24 approved mark (U + P monogram with broadcast arcs).
 * Rendered directly as SVG — zero network requests, so it can never become
 * a broken image, regardless of how static files are served in production.
 */
export default function LogoMark({
  className = "h-10 w-10",
  title = "IPTVUS24",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      {/* U — deep brand blue */}
      <path d="M12 22 H44 V34 L30 46 L44 58 V70 H12 Z" fill="#0A5CFF" />
      {/* P — brand cyan */}
      <path
        d="M70 102 V50 H84 A13 13 0 0 1 84 76 H70"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Broadcast arcs — brand cyan */}
      <g fill="none" stroke="#00C2FF" strokeWidth="8" strokeLinecap="round">
        <path d="M67 42 A13 13 0 0 1 80 29" />
        <path d="M56 42 A24 24 0 0 1 80 18" />
        <path d="M45 42 A35 35 0 0 1 80 7" />
      </g>
    </svg>
  );
}
