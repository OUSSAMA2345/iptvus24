import Logo from "./Logo";
import { footerCols } from "../data";
import { CookieSettingsButton } from "../../app/ui/CookieConsent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tagline />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-soft">
              Clear plan information, device guidance, and direct support for IPTVUS24 visitors.
            </p>
            <a href="mailto:support@iptvus24.com" className="mt-4 inline-block text-sm font-bold text-brand hover:underline">
              support@iptvus24.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {footerCols.map((column) => (
              <nav key={column.title} aria-label={`${column.title} links`}>
                <h2 className="text-xs font-extrabold uppercase tracking-wide text-ink">{column.title}</h2>
                <ul className="mt-3 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-slate-soft hover:text-brand">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 text-xs text-slate-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} IPTVUS24. All rights reserved.</p>
          <p>Content availability varies by region. Review the service terms before ordering.</p>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
