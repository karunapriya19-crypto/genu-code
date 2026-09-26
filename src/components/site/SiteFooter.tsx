import { BUSINESS } from "@/lib/site-data";
import { SITE_LINKS } from "@/lib/site-navigation";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-3">
            <span className="brand-gradient flex size-10 items-center justify-center rounded-lg text-sm font-black text-primary-foreground">
              TZ
            </span>
            <span>
              <strong className="block text-sm text-foreground">{BUSINESS.name}</strong>
              <span>{BUSINESS.founder} · {BUSINESS.youtubeChannelName}</span>
            </span>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {SITE_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="font-medium hover:text-primary">
                {link.label}
              </Link>
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