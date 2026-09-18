import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { BUSINESS, whatsappLink } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "./LeadDialog";

const NAV = [
  { href: "#mentor", label: "Mentor" },
  { href: "#courses", label: "Courses" },
  { href: "#simulator", label: "Chart simulator" },
  { href: "#youtube", label: "YouTube" },
  { href: "#calculators", label: "Calculators" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { open } = useLeadDialog();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-strong/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span
            className="brand-gradient flex size-11 items-center justify-center rounded-xl text-lg font-black text-primary-foreground"
            aria-hidden
          >
            TZ
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold sm:text-lg">
              Trading Zone <span className="brand-text">Vellore</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {BUSINESS.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a
              href={`tel:${BUSINESS.phone}`}
              aria-label={`Call ${BUSINESS.phoneDisplay}`}
            >
              <Phone className="size-4" aria-hidden />
              {BUSINESS.phoneDisplay}
            </a>
          </Button>
          <Button size="sm" onClick={() => open("masterclass")}>
            Free masterclass
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpenMenu((v) => !v)}
          aria-expanded={openMenu}
          aria-controls="mobile-menu"
          aria-label={openMenu ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center rounded-lg text-foreground md:hidden"
        >
          {openMenu ? <Menu className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {openMenu && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface-strong px-4 pb-6 pt-2 md:hidden"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpenMenu(false)}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-lg text-muted-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="py-3 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button asChild variant="outline">
              <a
                href={whatsappLink(
                  `Hello ${BUSINESS.name}, I would like details about your courses.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </Button>
            <Button
              onClick={() => {
                setOpenMenu(false);
                open("masterclass");
              }}
            >
              Free masterclass
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
