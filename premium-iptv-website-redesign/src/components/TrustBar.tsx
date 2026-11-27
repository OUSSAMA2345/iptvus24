import Link from "next/link";
import { Icon } from "./ui";

const links = [
  { icon: "devices" as const, title: "Check compatibility", href: "#devices" },
  { icon: "shield" as const, title: "Read the service terms", href: "/terms" },
  { icon: "chat" as const, title: "Talk to support", href: "/contact" },
];

export default function TrustBar() {
  return (
    <section aria-label="Useful information" className="border-y border-line bg-white py-5">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-6">
        {links.map((link) => (
          <li key={link.title}>
            {link.href.startsWith("/") ? (
              <Link href={link.href} className="flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-mist hover:text-brand">
                <Icon name={link.icon} className="h-4 w-4 text-brand" />
                {link.title}
                <span aria-hidden="true" className="text-brand">→</span>
              </Link>
            ) : (
              <a href={link.href} className="flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-mist hover:text-brand">
                <Icon name={link.icon} className="h-4 w-4 text-brand" />
                {link.title}
                <span aria-hidden="true" className="text-brand">→</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
