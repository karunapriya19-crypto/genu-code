import { describe, expect, it } from "vitest";
import { normalizeExplanation, validateChartFile, validateChartDataURL } from "./chart-explanation";

const notes = (text: string) => ({ isChart: true, observations: [text], concepts: [], limitations: ["A screenshot lacks broader context."], questions: [] });

describe("educational-only chart explanations", () => {
  it("allows descriptions of visible historical patterns", () => {
    expect(normalizeExplanation(notes("A sequence of higher candle lows is visible." )).observations).toEqual(["A sequence of higher candle lows is visible."]);
  });
  it.each(["Buy now", "Sell at 200", "You should buy this stock", "Entry price 100", "Set a stop-loss at 50", "Price target 300", "Guaranteed profit", "Buy: 200"])("rejects trade recommendations: %s", (text) => {
    expect(() => normalizeExplanation(notes(text))).toThrow("educational-only safeguards");
  });
  it("rejects non-image files", () => expect(() => validateChartFile("application/pdf", 100)).toThrow());
  it("rejects an oversized screenshot", () => expect(() => validateChartFile("image/png", 5 * 1024 * 1024 + 1)).toThrow());
  it("rejects spoofed image bytes", () => expect(() => validateChartDataURL("data:image/png;base64,aGVsbG8=" )).toThrow("does not match"));
  it("rejects external URLs", () => expect(() => validateChartDataURL("https://example.com/chart.png")).toThrow());
});