import { BadgeCheck, MessageSquareQuote, ShieldCheck } from "lucide-react";

const REVIEW_STANDARDS = [
  "Student identity or source confirmed",
  "Feedback shown in the student's own words",
  "No profit claims or guaranteed outcomes",
];

export function Testimonials() {
  return (
    <section className="py-20" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Student feedback
            </p>
            <h2 id="testimonials-heading" className="text-3xl font-black sm:text-4xl">
              Reviews will be published only after verification
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              The supplied draft included named testimonials, but no source links or student
              approvals were provided. They are intentionally not presented as genuine reviews.
            </p>
          </div>

          <div className="surface-panel rounded-2xl p-6 lg:col-span-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageSquareQuote className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-bold">Our review publishing standard</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  This protects students and helps visitors make decisions using reliable evidence.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {REVIEW_STANDARDS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <BadgeCheck className="size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" aria-hidden />
              Unverified marketing claims are not shown on this website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}