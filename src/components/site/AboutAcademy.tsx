import { BarChart3, BookOpenCheck, CalendarClock, LineChart, RefreshCcw, ShieldCheck } from "lucide-react";

const UNIQUE = [
  { icon: LineChart, title: "Real-market practice", body: "Strategies used by professional traders, explained through live market sessions — not just textbook theory." },
  { icon: BarChart3, title: "Data-driven decisions", body: "Analyse market data, spot patterns and read price movement instead of relying on guesswork." },
  { icon: ShieldCheck, title: "Risk management first", body: "Protect your capital: manage losses, book profits and build disciplined trading habits." },
];

const INCLUDED = [
  { icon: CalendarClock, title: "150 days of mentorship", body: "Structured training with live market exposure and continuous guidance." },
  { icon: RefreshCcw, title: "Revision classes", body: "Dedicated sessions to revisit key topics and strengthen understanding." },
  { icon: BookOpenCheck, title: "Practical trading system", body: "Structured methods you learn to apply in real market conditions." },
];

export function AboutAcademy() {
  return (
    <div className="mb-12 space-y-10">
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <h3 className="text-2xl font-black sm:text-3xl">Why choose our Trading with Data Science course?</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Developed by D. Srinivasan, the course combines stock market knowledge with data science —
          for complete beginners and experienced traders alike. With more than 11,000 students
          mentored, we help you learn step by step and build the confidence to trade independently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {UNIQUE.map(({ icon: Icon, title, body }) => (
          <div key={title} className="surface-panel rounded-xl border-t-4 border-t-primary p-5">
            <Icon className="size-6 text-primary" aria-hidden />
            <h4 className="mt-3 font-bold">{title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-4 text-center text-lg font-extrabold">What you get with our training</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-xl border border-gold/50 bg-gold/10 p-4">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h4 className="text-sm font-bold">{title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
