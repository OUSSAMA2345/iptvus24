import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "../../src/components/Closing";
import ThemeToggle from "../../src/components/ThemeToggle";
import { WHATSAPP_NUMBER, WHATSAPP_URL, WhatsAppIcon } from "../../src/components/WhatsApp";
import { cn } from "../../src/utils/cn";

export function SiteProse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-8 text-sm leading-7 text-slate-soft [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-ink [&_h3]:font-bold [&_h3]:text-ink [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul>li]:ml-5 [&_ul>li]:list-disc",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function SitePage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="document-site">
      <header className="document-header border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-ink">
            IPTV<span className="text-brand">US24</span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm font-bold">
            <ThemeToggle />
            <Link href="/" className="rounded px-1 py-0.5 text-slate-soft hover:text-brand">Home</Link>
            <Link href="/contact" className="rounded px-1 py-0.5 text-slate-soft hover:text-brand">Contact</Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#e8f9ee] px-3 py-2 text-[#075e54]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
              <span className="hidden sm:inline">{WHATSAPP_NUMBER}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="min-h-[65vh] bg-mist outline-none">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-soft">{description}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
