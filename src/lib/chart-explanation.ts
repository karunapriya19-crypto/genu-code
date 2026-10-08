import { z } from "zod";

export const MAX_CHART_BYTES = 5 * 1024 * 1024;
export const CHART_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const CHART_REQUESTS_PER_HOUR = 10;

export const explanationSchema = z.object({
  isChart: z.boolean(),
  observations: z.array(z.string()),
  concepts: z.array(z.string()),
  limitations: z.array(z.string()),
  questions: z.array(z.string()),
});
export type ChartExplanation = z.infer<typeof explanationSchema>;

export function validateChartFile(type: string, size: number) {
  if (!CHART_MIME_TYPES.includes(type)) throw new Error("Choose a PNG, JPEG, or WebP screenshot.");
  if (size <= 0) throw new Error("The screenshot is empty.");
  if (size > MAX_CHART_BYTES) throw new Error("The screenshot must be 5 MB or smaller.");
}

export function validateChartDataURL(value: unknown): string {
  if (typeof value !== "string" || value.length > Math.ceil(MAX_CHART_BYTES * 4 / 3) + 100) {
    throw new Error("The screenshot must be 5 MB or smaller.");
  }
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) throw new Error("Choose a PNG, JPEG, or WebP screenshot.");
  const mime = match[1];
  const encoded = match[2];
  if (!mime || !encoded) throw new Error("The screenshot is empty.");
  let bytes: string;
  try { bytes = atob(encoded); } catch { throw new Error("The screenshot could not be read."); }
  validateChartFile(mime, bytes.length);
  const starts = (...values: number[]) => values.every((v, i) => bytes.charCodeAt(i) === v);
  const valid = mime === "image/png" ? starts(137, 80, 78, 71, 13, 10, 26, 10)
    : mime === "image/jpeg" ? starts(255, 216, 255)
    : bytes.slice(0, 4) === "RIFF" && bytes.slice(8, 12) === "WEBP";
  if (!valid) throw new Error("The file does not match its image format.");
  return value;
}

// Fail closed on actionable output, not just a disclaimer attached to advice.
export function normalizeExplanation(value: unknown): ChartExplanation {
  const parsed = explanationSchema.parse(value);
  const allText = [...parsed.observations, ...parsed.concepts, ...parsed.limitations, ...parsed.questions].join(" ");
  const actionable = /\b(?:buy|sell|hold|enter|exit|long|short)\s+(?:now|here|at|above|below|this|the\s+(?:stock|asset|index|position))\b|\b(?:stop[- ]?loss|take[- ]?profit|price target|entry price|exit price|trade recommendation|guaranteed (?:profit|return))\b|\b(?:you should|i recommend|we recommend)\s+(?:buy|sell|trade|invest|enter|exit)\b|\b(?:buy|sell|entry|target)\s*[:@]\s*\d/i;
  if (actionable.test(allText)) throw new Error("The explanation did not meet educational-only safeguards. No result was displayed.");
  const trim = (items: string[]) => items.slice(0, 4).map((s) => s.slice(0, 650));
  return { isChart: parsed.isChart, observations: trim(parsed.observations), concepts: trim(parsed.concepts), limitations: trim(parsed.limitations), questions: trim(parsed.questions) };
}