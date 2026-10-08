import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { validateChartDataURL } from "./chart-explanation";
import type { ChartExplanation } from "./chart-explanation";

export type ExplanationResult = { explanation: ChartExplanation | null; error: string | null; status: number };

export const explainChart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { image: string }) => ({ image: validateChartDataURL(input.image) }))
  .handler(async ({ data, context }): Promise<ExplanationResult> => {
    const { analyzeChart } = await import("./chart-ai/analyze.server");
    return analyzeChart(data.image, context.userId, getRequest());
  });