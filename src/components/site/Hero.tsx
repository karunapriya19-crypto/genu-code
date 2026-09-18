import { BookOpen, CheckCircle2, Phone, Rocket } from "lucide-react";

import { BUSINESS } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "./LeadDialog";

const POINTS = [
  "Nifty & BankNifty price action",
  "Risk management and trading psychology",
  "Classroom mentorship during market hours",
];

export function Hero() {
  const { open } = useLeadDialog();

  return (
    <section id="top" className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
            Stock market training in Vellore — Tamil & English
          </p>

          <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Learn price action and options trading{" "}
            <span className="brand-text">with a structured method</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Classroom mentorship in {BUSINESS.addressShort} plus online live
            training, taught by <strong className="text-foreground">{BUSINESS.founder}</strong>,
            founder of {BUSINESS.name} and the {BUSINESS.youtubeChannelName} YouTube
            channel.
          </p>

          <ul className="flex flex-wrap gap-3 text-xs font-semibold">
            {POINTS.map((point) => (
              <li
                key={point}
                className="surface-panel flex items-center gap-2 rounded-lg px-3.5 py-2"
              >
                <CheckCircle2 className="size-4 text-primary" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button size="lg" onClick={() => open("masterclass")}>
              <Rocket className="size-4" aria-hidden />
              Request a free masterclass seat
            </Button>
            <Button size="lg" variant="outline" onClick={() => open("ebook")}>
              <BookOpen className="size-4" aria-hidden />
              Request the free trading guide
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Trading and investing carry a real risk of loss. We teach a method —
            we do not promise profits, and we are not SEBI-registered investment
            advisers.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="surface-panel glow-shadow space-y-5 rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                Academy at a glance
              </span>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Classroom</dt>
                <dd className="text-right font-semibold">{BUSINESS.addressShort}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Languages</dt>
                <dd className="text-right font-semibold">Tamil & English</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Mentor</dt>
                <dd className="text-right font-semibold text-primary">
                  {BUSINESS.founder}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">YouTube</dt>
                <dd className="text-right">
                  <a
                    href={BUSINESS.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-video hover:underline"
                  >
                    {BUSINESS.youtubeChannelName}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Office hours</dt>
                <dd className="text-right font-semibold">{BUSINESS.hours}</dd>
              </div>
            </dl>

            <Button asChild variant="secondary" className="w-full">
              <a href={`tel:${BUSINESS.phone}`}>
                <Phone className="size-4" aria-hidden />
                Call admissions: {BUSINESS.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
