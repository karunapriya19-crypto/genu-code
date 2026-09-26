import { BUSINESS } from "@/lib/site-data";

const LINKS = [
  { href: "#mentor", label: "Mentor" },
  { href: "#youtube", label: "YouTube" },
  { href: "#courses", label: "Courses" },
  { href: "#simulator", label: "Simulator" },
  { href: "#calculators", label: "Calculators" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#top" className="flex items-center gap-3">
            <span className="brand-gradient flex size-10 items-center justify-center rounded-lg text-sm font-black text-primary-foreground">
              TZ
            </span>
            <span>
              <strong className="block text-sm text-foreground">{BUSINESS.name}</strong>
              <span>{BUSINESS.founder} · {BUSINESS.youtubeChannelName}</span>
            </span>
          </a>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="font-medium hover:text-primary">
                {link.label}
              </a>
            ))}
          </nav>

          <a href={`tel:${BUSINESS.phone}`} className="font-bold text-primary hover:underline">
            {BUSINESS.phoneDisplay}
          </a>
        </div>

        <div className="space-y-2 border-t border-border pt-6 text-center text-[11px] leading-relaxed">
          <p>
            Trading and options involve substantial risk of loss. All content and tools are
            educational only and are not SEBI-registered investment advice.
          </p>
          <p>© 2026 {BUSINESS.name}. All rights reserved. {BUSINESS.addressShort}.</p>
        </div>
      </div>
    </footer>
  );
}