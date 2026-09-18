import { Youtube } from "lucide-react";

import { BUSINESS } from "@/lib/site-data";

const PILLARS = [
  {
    title: "Price action first",
    body: "Candlestick behaviour, market structure and liquidity rather than a stack of lagging indicators.",
  },
  {
    title: "Live market practice",
    body: "Students work through setups during market hours at the Thottapalayam classroom.",
  },
  {
    title: "Risk rules before entries",
    body: "Fixed risk per trade, written stop levels and a journal for every position.",
  },
  {
    title: "Tamil and English",
    body: "Sessions explained for beginners, working professionals and full-time traders.",
  },
];

export function Mentor() {
  return (
    <section
      id="mentor"
      className="border-y border-border bg-surface-strong py-20"
      aria-labelledby="mentor-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="surface-panel mx-auto max-w-sm rounded-2xl p-4">
            {/* No stock photo is used here. A stock image labelled as the founder
                would mislead visitors; the owner must supply a real photograph. */}
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/40 text-center">
              <span
                className="brand-gradient flex size-20 items-center justify-center rounded-full text-2xl font-black text-primary-foreground"
                aria-hidden
              >
                DS
              </span>
              <p className="px-6 text-xs text-muted-foreground">
                Photograph of {BUSINESS.founder} to be added by the academy.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-surface p-4">
              <h3 className="text-lg font-black">{BUSINESS.founder}</h3>
              <p className="text-xs font-medium text-primary">{BUSINESS.founderRole}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {BUSINESS.name} · {BUSINESS.youtubeChannelName}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Mentorship
          </p>
          <h2 id="mentor-heading" className="text-3xl font-extrabold sm:text-4xl">
            Meet your mentor: <span className="brand-text">{BUSINESS.founder}</span>
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {BUSINESS.founder} trains retail traders in Vellore and across Tamil Nadu
            to move away from tip-based, indicator-heavy trading towards a
            disciplined, rule-based approach to the Indian markets.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            He runs the {BUSINESS.youtubeChannelName} YouTube channel, where index
            option concepts, supply–demand zones and capital protection are explained
            in Tamil.
          </p>

          <div className="grid gap-4 pt-2 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="surface-panel rounded-xl border-l-4 border-l-primary p-4"
              >
                <h3 className="text-sm font-bold">{pillar.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{pillar.body}</p>
              </div>
            ))}
          </div>

          <a
            href={BUSINESS.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-brand-video hover:underline"
          >
            <Youtube className="size-5" aria-hidden />
            Visit the {BUSINESS.youtubeChannelName} channel
          </a>
        </div>
      </div>
    </section>
  );
}
