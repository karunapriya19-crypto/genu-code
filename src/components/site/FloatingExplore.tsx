import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Compass, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE_LINKS } from "@/lib/site-navigation";

export function FloatingExplore() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div id="explore-pages" className="mb-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-surface-strong shadow-2xl shadow-background/70 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-xs font-bold uppercase text-primary">Explore Trading Zone</span>
            <Button type="button" size="icon" variant="ghost" aria-label="Close page menu" onClick={() => setOpen(false)}><X aria-hidden /></Button>
          </div>
          <nav aria-label="Explore pages" className="p-2">
            {SITE_LINKS.map(({ to, label, detail, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} aria-current={pathname === to ? "page" : undefined} className="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent focus-visible:bg-accent aria-[current=page]:bg-primary/10">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-4" aria-hidden /></span>
                <span className="min-w-0 flex-1"><strong className="block text-sm text-foreground">{label}</strong><span className="block text-xs text-muted-foreground">{detail}</span></span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </nav>
        </div>
      )}
      <Button type="button" size="lg" aria-label={open ? "Close explore menu" : "Explore pages"} aria-expanded={open} aria-controls="explore-pages" onClick={() => setOpen((v) => !v)} className="ml-auto flex h-12 gap-2 rounded-full px-5 shadow-lg shadow-background/70">
        {open ? <X aria-hidden /> : <Compass aria-hidden />}{open ? "Close" : "Explore pages"}
      </Button>
    </div>
  );
}