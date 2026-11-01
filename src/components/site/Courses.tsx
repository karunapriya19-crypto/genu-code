import { useState } from "react";
import {
  CandlestickChart,
  CheckCircle2,
  Clock,
  Crosshair,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BUSINESS, COURSES, COURSE_FILTERS, whatsappLink } from "@/lib/site-data";
import type { Course } from "@/lib/site-data";
import learnBanner from "@/assets/learn-simplified-banner.jpg.asset.json";
import differentBanner from "@/assets/why-different-banner.jpg.asset.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CATEGORY_ICON: Record<Course["category"], LucideIcon> = {
  intraday: CandlestickChart,
  priceaction: Crosshair,
  swing: TrendingUp,
};

export function Courses() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Course | null>(null);

  const visible = COURSES.filter((course) => filter === "all" || course.category === filter);

  return (
    <section id="courses" className="py-16 sm:py-20" aria-labelledby="courses-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Curriculum
          </p>
          <span className="gold-line mx-auto block h-1 w-16 rounded-full" aria-hidden />
          <h2 id="courses-heading" className="text-3xl font-black sm:text-4xl">
            Trading programs in Vellore
          </h2>
          <p className="text-sm text-muted-foreground">
            Three learning paths, each with a published module outline. Fees are shared over
            WhatsApp or by phone because batch pricing changes.
          </p>
        </div>

        <div className="mb-12 grid gap-5 lg:grid-cols-2">
          <img
            src={differentBanner.url}
            width={1600}
            height={733}
            loading="lazy"
            decoding="async"
            alt="Trading Zone Vellore: why this course is different. Trading with data science, developed by D. Srinivasan. Real-world application, data-driven decisions and smart risk management."
            className="h-auto w-full rounded-2xl border border-border shadow-lg shadow-primary/10"
          />
          <img
            src={learnBanner.url}
            width={1600}
            height={685}
            loading="lazy"
            decoding="async"
            alt="Trading Zone Vellore: learn to trade the simplified way. Beginner to advanced, live market mentoring and 150 days of support, with revision classes, a trading system and practical learning."
            className="h-auto w-full rounded-2xl border border-border shadow-lg shadow-primary/10"
          />
        </div>

        <div
          role="tablist"
          aria-label="Course categories"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {COURSE_FILTERS.map((option) => {
            const active = filter === option.value;
            return (
              <Button
                key={option.value}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(option.value)}
                variant={active ? "default" : "outline"}
                className="min-h-10 px-4 text-xs font-semibold"
              >
                {option.label}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {visible.map((course) => {
            const Icon = CATEGORY_ICON[course.category];
            return (
              <article
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md shadow-foreground/5 transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15"
              >
                <div className="relative bg-gradient-to-br from-accent via-card to-gold/15 p-6 pb-5">
                  <span className="gold-line absolute inset-x-0 top-0 h-1" aria-hidden />
                  <div className="flex items-start justify-between gap-3">
                    <span className="brand-gradient flex size-14 items-center justify-center rounded-2xl text-primary-foreground shadow-lg shadow-primary/25">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-gold/60 bg-gold/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-foreground">
                        <Clock className="size-3.5" aria-hidden />
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                    {course.categoryLabel}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold leading-snug">{course.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:min-h-[5.75rem]">
                    {course.summary}
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 pt-5">
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      Curriculum
                    </h4>
                    <ol className="space-y-1.5 text-xs text-muted-foreground">
                      {course.syllabus.map((item) => (
                        <li key={item.module} className="flex gap-2">
                          <span
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold"
                            aria-hidden
                          />
                          {item.module}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      You will learn to
                    </h4>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {course.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      What is included
                    </h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {course.highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto grid gap-2 pt-2 sm:grid-cols-2 lg:grid-cols-1">
                    <Button asChild>
                      <a
                        href={whatsappLink(
                          `Hello ${BUSINESS.name}, I would like to enquire about: ${course.title}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" aria-hidden />
                        Enquire on WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => setSelected(course)}>
                      View syllabus
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.duration} · {selected.categoryLabel}
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {selected.syllabus.map((item) => (
                  <div key={item.module} className="rounded-lg border border-border bg-surface p-3">
                    <h4 className="text-sm font-bold text-primary">{item.module}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                {selected.fee
                  ? `Course fee: ${selected.fee}`
                  : "Fees are not published on this site. Ask us on WhatsApp or by phone for the current batch fee and schedule."}
              </p>

              <Button asChild className="w-full">
                <a
                  href={whatsappLink(
                    `Hello ${BUSINESS.name}, please share the fee and next batch date for: ${selected.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Ask about fees on WhatsApp
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

