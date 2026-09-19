import { useMemo, useState } from "react";
import { Calculator, ChartNoAxesCombined, Info } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const GROWTH_RATES = [
  { label: "Bank FD", rate: 0.065, className: "bg-muted-foreground" },
  { label: "Mutual fund example", rate: 0.14, className: "bg-chart-2" },
  { label: "Hypothetical trading", rate: 0.3, className: "bg-primary" },
] as const;

export function Calculators() {
  const [capital, setCapital] = useState(100_000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [rewardRatio, setRewardRatio] = useState(2.5);
  const [winRate, setWinRate] = useState(50);
  const [years, setYears] = useState(3);

  const expectancy = useMemo(() => {
    const riskAmount = capital * (riskPercent / 100);
    const wins = Math.round(20 * (winRate / 100));
    const losses = 20 - wins;
    const net = wins * riskAmount * rewardRatio - losses * riskAmount;
    return { riskAmount, wins, losses, net, roi: (net / capital) * 100 };
  }, [capital, rewardRatio, riskPercent, winRate]);

  const growth = GROWTH_RATES.map((item) => ({
    ...item,
    value: capital * Math.pow(1 + item.rate, years),
  }));
  const maxGrowth = Math.max(...growth.map((item) => item.value));

  return (
    <section
      id="calculators"
      className="border-y border-border bg-surface-strong py-20"
      aria-labelledby="calculators-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Planning tools
          </p>
          <h2 id="calculators-heading" className="text-3xl font-black sm:text-4xl">
            Trading risk and growth calculators
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore how risk, reward, win rate, and compounding change an illustrative outcome.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <article className="surface-panel rounded-2xl p-5 sm:p-7">
            <div className="mb-6 border-b border-border pb-4">
              <h3 className="flex items-center gap-2 text-xl font-extrabold">
                <Calculator className="size-5 text-primary" aria-hidden />
                20-trade expectancy model
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                A mathematical illustration, not a forecast of trading results.
              </p>
            </div>

            <div className="space-y-6">
              <CalculatorSlider
                id="capital"
                label="Trading capital"
                value={capital}
                display={formatCurrency(capital)}
                min={20_000}
                max={1_000_000}
                step={10_000}
                onChange={setCapital}
              />
              <CalculatorSlider
                id="risk"
                label="Risk per trade"
                value={riskPercent}
                display={`${riskPercent}% (${formatCurrency(expectancy.riskAmount)})`}
                min={0.5}
                max={5}
                step={0.5}
                onChange={setRiskPercent}
              />
              <CalculatorSlider
                id="reward"
                label="Risk : reward"
                value={rewardRatio}
                display={`1 : ${rewardRatio}`}
                min={1}
                max={5}
                step={0.5}
                onChange={setRewardRatio}
              />
              <CalculatorSlider
                id="win-rate"
                label="Strategy win rate"
                value={winRate}
                display={`${winRate}%`}
                min={30}
                max={80}
                step={5}
                onChange={setWinRate}
              />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 rounded-xl border border-primary/30 bg-background p-4 text-center">
              <Result label="Net after 20 trades" value={formatCurrency(expectancy.net)} />
              <Result
                label="Illustrative ROI"
                value={`${expectancy.roi >= 0 ? "+" : ""}${expectancy.roi.toFixed(1)}%`}
              />
              <p className="col-span-2 text-[11px] text-muted-foreground">
                {expectancy.wins} wins and {expectancy.losses} losses, with fixed risk on every trade.
              </p>
            </div>
          </article>

          <article className="surface-panel rounded-2xl p-5 sm:p-7">
            <div className="mb-6 border-b border-border pb-4">
              <h3 className="flex items-center gap-2 text-xl font-extrabold">
                <ChartNoAxesCombined className="size-5 text-primary" aria-hidden />
                Compounding comparison
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Fixed annual assumptions applied to the selected starting capital.
              </p>
            </div>

            <CalculatorSlider
              id="years"
              label="Time period"
              value={years}
              display={`${years} ${years === 1 ? "year" : "years"}`}
              min={1}
              max={10}
              step={1}
              onChange={setYears}
            />

            <div className="mt-8 space-y-6" aria-label="Illustrative growth comparison">
              {growth.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-end justify-between gap-3 text-xs">
                    <span className="text-muted-foreground">
                      {item.label} ({(item.rate * 100).toFixed(1)}%)
                    </span>
                    <strong className="font-mono text-foreground">
                      {formatCurrency(item.value)}
                    </strong>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.className}`}
                      style={{ width: `${Math.max(12, (item.value / maxGrowth) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-notice/60 p-4 text-xs leading-relaxed text-notice-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>
                The 30% figure is a hypothetical teaching assumption, not a past result or
                promised return. Actual investments can lose value and returns are never fixed.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function CalculatorSlider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4 text-xs">
        <Label htmlFor={id} className="text-muted-foreground">
          {label}
        </Label>
        <output htmlFor={id} className="font-mono font-bold text-primary">
          {display}
        </output>
      </div>
      <Slider
        id={id}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => {
          const selected = next[0];
          if (selected !== undefined) onChange(selected);
        }}
        aria-label={label}
      />
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[10px] font-bold uppercase text-muted-foreground">
        {label}
      </span>
      <span className="mt-1 block break-words font-mono text-lg font-black text-primary sm:text-xl">
        {value}
      </span>
    </div>
  );
}