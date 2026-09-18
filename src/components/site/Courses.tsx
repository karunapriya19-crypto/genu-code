import { useState } from "react";
import { Clock, MessageCircle } from "lucide-react";

import { BUSINESS, COURSES, COURSE_FILTERS, whatsappLink } from "@/lib/site-data";
import type { Course } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Courses() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Course | null>(null);

  const visible = COURSES.filter(
    (course) => filter === "all" || course.category === filter,
  );

  return (
    <section id="courses" className="py-20" aria-labelledby="courses-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Curriculum
          </p>
          <h2 id="courses-heading" className="text-3xl font-black sm:text-4xl">
            Stock market programs in Vellore
          </h2>
          <p className="text-sm text-muted-foreground">
            Three learning paths, each with a published module outline. Fees are
            shared over WhatsApp or by phone because batch pricing changes.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Course categories"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {COURSE_FILTERS.map((option) => {
            const active = filter === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "surface-panel text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {visible.map((course) => (
            <article
              key={course.id}
              className="surface-panel flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden />
                    {course.duration}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
                  {course.summary}
                </p>
                <ul className="mb-6 space-y-2 text-xs text-muted-foreground">
                  {course.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="secondary" onClick={() => setSelected(course)}>
                View syllabus
              </Button>
            </article>
          ))}
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
                  <div
                    key={item.module}
                    className="rounded-lg border border-border bg-surface p-3"
                  >
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
