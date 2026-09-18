/**
 * Sample index levels used as a teaching visual.
 * These are NOT live market quotes — the site has no market-data provider.
 * The strip is explicitly labelled so no visitor can mistake it for a feed.
 */
const SAMPLE_QUOTES = [
  { symbol: "NIFTY 50", level: "24,850", move: "+0.58%", up: true },
  { symbol: "BANKNIFTY", level: "52,140", move: "+0.62%", up: true },
  { symbol: "FINNIFTY", level: "23,410", move: "-0.19%", up: false },
  { symbol: "RELIANCE", level: "2,980", move: "+0.62%", up: true },
  { symbol: "HDFCBANK", level: "1,650", move: "-0.49%", up: false },
  { symbol: "TCS", level: "4,210", move: "+0.84%", up: true },
];

export function TickerBar() {
  const loop = [...SAMPLE_QUOTES, ...SAMPLE_QUOTES];

  return (
    <div className="border-b border-border bg-surface-strong">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2 sm:px-6 lg:px-8">
        <span className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Sample data · not live
        </span>
        <div className="overflow-hidden">
          <div className="ticker-track gap-8" aria-hidden>
            {loop.map((q, i) => (
              <span
                key={`${q.symbol}-${i}`}
                className="flex shrink-0 items-center gap-2 font-mono text-xs"
              >
                <span className="font-bold">{q.symbol}</span>
                <span className="text-muted-foreground">{q.level}</span>
                <span className={q.up ? "text-bull" : "text-bear"}>{q.move}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
