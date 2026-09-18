import { useCallback, useEffect, useRef, useState } from "react";
import { Info, Pause, Play, RefreshCw, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Candle = { open: number; high: number; low: number; close: number };

/**
 * Teaching simulator. Candles come from a seeded random walk generated in the
 * browser — there is no market-data provider connected to this project, so the
 * UI never uses the words "live" or "real-time" for this panel.
 */
function generateCandles(start: number, count = 32): Candle[] {
  const out: Candle[] = [];
  let price = start;
  for (let i = 0; i < count; i += 1) {
    const open = price;
    const close = open + (Math.random() - 0.48) * (start * 0.0015);
    const high = Math.max(open, close) + Math.random() * (start * 0.0006);
    const low = Math.min(open, close) - Math.random() * (start * 0.0006);
    out.push({ open, high, low, close });
    price = close;
  }
  return out;
}

const START_LEVELS: Record<string, number> = {
  "Index A (sample)": 24700,
  "Index B (sample)": 52000,
  "Stock A (sample)": 2950,
};

export function ChartSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [asset, setAsset] = useState("Index A (sample)");
  const [candles, setCandles] = useState<Candle[]>(() =>
    generateCandles(START_LEVELS["Index A (sample)"]!),
  );
  const [showFast, setShowFast] = useState(true);
  const [showSlow, setShowSlow] = useState(true);
  const [running, setRunning] = useState(true);
  const [note, setNote] = useState("Simulation running — sample candles only.");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    let min = Math.min(...candles.map((c) => c.low));
    let max = Math.max(...candles.map((c) => c.high));
    const pad = (max - min) * 0.12 || 1;
    min -= pad;
    max += pad;
    const span = max - min || 1;
    const toY = (value: number) => height - ((value - min) / span) * height;
    const slot = width / candles.length;

    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    candles.forEach((c, i) => {
      const x = i * slot + slot / 2;
      const bull = c.close >= c.open;
      ctx.strokeStyle = bull ? "#34d399" : "#f87171";
      ctx.fillStyle = bull ? "#34d399" : "#f87171";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, toY(c.high));
      ctx.lineTo(x, toY(c.low));
      ctx.stroke();
      const top = Math.min(toY(c.open), toY(c.close));
      const bodyHeight = Math.max(Math.abs(toY(c.close) - toY(c.open)), 2);
      ctx.fillRect(x - slot * 0.32, top, slot * 0.64, bodyHeight);
    });

    const drawEma = (period: number, color: string) => {
      const k = 2 / (period + 1);
      let ema = candles[0]!.close;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      candles.forEach((c, i) => {
        ema = c.close * k + ema * (1 - k);
        const x = i * slot + slot / 2;
        const y = toY(ema);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    if (showFast) drawEma(20, "#34d399");
    if (showSlow) drawEma(50, "#60a5fa");
  }, [candles, showFast, showSlow]);

  useEffect(() => {
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const next = prev.slice();
        const last = { ...next[next.length - 1]! };
        last.close += (Math.random() - 0.47) * (last.close * 0.0004);
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        next[next.length - 1] = last;
        return next;
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, [running]);

  function reset(nextAsset: string) {
    setAsset(nextAsset);
    setCandles(generateCandles(START_LEVELS[nextAsset] ?? 24700));
    setNote("Simulation reset with a fresh sample series.");
  }

  function simulateBreakout() {
    setCandles((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice();
      const last = { ...next[next.length - 1]! };
      const target = last.close * 1.0025;
      next[next.length - 1] = {
        open: last.open,
        high: target * 1.0004,
        low: last.low,
        close: target,
      };
      return next;
    });
    setNote("Breakout example injected into the simulation (teaching scenario).");
  }

  return (
    <section id="simulator" className="py-20" aria-labelledby="simulator-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl space-y-2 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Teaching tool
          </p>
          <h2 id="simulator-heading" className="text-3xl font-black sm:text-4xl">
            Candlestick chart simulator
          </h2>
          <p className="text-sm text-muted-foreground">
            A practice chart for reading candles and moving averages.
          </p>
        </div>

        <div className="surface-panel overflow-hidden rounded-2xl p-4 sm:p-6">
          <p className="mb-4 flex items-start gap-2 rounded-lg bg-notice/60 p-3 text-xs text-notice-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              Educational simulation — randomly generated prices, not live market
              data. No exchange or data-vendor feed is connected to this site.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4 border-b border-border pb-4 text-xs">
            <div className="flex items-center gap-2">
              <Label htmlFor="sim-asset" className="font-bold">
                Series
              </Label>
              <select
                id="sim-asset"
                value={asset}
                onChange={(e) => reset(e.target.value)}
                className="rounded-lg border border-border bg-surface-strong px-3 py-2 font-mono text-xs text-primary"
              >
                {Object.keys(START_LEVELS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="ema-fast"
                  checked={showFast}
                  onCheckedChange={(v) => setShowFast(v === true)}
                />
                <Label htmlFor="ema-fast">EMA 20</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="ema-slow"
                  checked={showSlow}
                  onCheckedChange={(v) => setShowSlow(v === true)}
                />
                <Label htmlFor="ema-slow">EMA 50</Label>
              </div>
            </div>

            <div className="ml-auto flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setRunning((v) => !v)}>
                {running ? (
                  <Pause className="size-3.5" aria-hidden />
                ) : (
                  <Play className="size-3.5" aria-hidden />
                )}
                {running ? "Pause" : "Resume"}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => reset(asset)}>
                <RefreshCw className="size-3.5" aria-hidden />
                New series
              </Button>
              <Button size="sm" onClick={simulateBreakout}>
                <Zap className="size-3.5" aria-hidden />
                Breakout example
              </Button>
            </div>
          </div>

          <div className="relative my-4 h-[320px] w-full overflow-hidden rounded-xl border border-border bg-surface-strong sm:h-[380px]">
            <canvas
              ref={canvasRef}
              className="block size-full"
              role="img"
              aria-label="Simulated candlestick chart with optional moving averages"
            />
          </div>

          <p
            aria-live="polite"
            className="rounded-xl border border-border bg-surface-strong p-3 font-mono text-xs text-muted-foreground"
          >
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}
