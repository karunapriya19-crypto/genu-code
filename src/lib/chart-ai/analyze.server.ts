import { NoObjectGeneratedError, Output } from "ai";
import { createResponsesCall } from "./responses.server.ts";
import { sdkImage } from "./media-parts.server.ts";
import { CHART_EDUCATION_INSTRUCTIONS } from "./prompt.server";
import { explanationSchema, normalizeExplanation } from "../chart-explanation";
import type { ExplanationResult } from "../chart-explanation.functions";

export async function analyzeChart(image: string, userId: string, request: Request): Promise<ExplanationResult> {
  // Caller identity is verified by requireSupabaseAuth before importing this module.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const fail = (error: string, status = 500): ExplanationResult => ({ explanation: null, error, status });
  const { data: gate, error: gateError } = await supabaseAdmin.from("chart_ai_gate").select("paused,reason,status").eq("id", "chart-explanation").maybeSingle();
  if (gateError) return fail("AI availability could not be checked. Please try later.");
  if (gate?.paused) return fail(gate.reason ?? "Chart explanations are paused until AI access is restored.", gate.status ?? 403);
  const { data: allowed, error: quotaError } = await supabaseAdmin.rpc("reserve_chart_explanation", { p_user_id: userId });
  if (quotaError) return fail("The request limit could not be checked. Please try later.");
  if (!allowed) return fail("You have used 10 explanations in this hour. Please try after your hourly window resets.", 429);
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return fail("AI is not configured yet. Please contact the academy.", 401);
  let upstreamMessage = "The AI explanation could not be completed. Please try later.";
  let upstreamStatus = 500;
  const pauseTasks: PromiseLike<unknown>[] = [];
  const call = createResponsesCall(request, { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" }, [{
    role: "user", content: [{ type: "text", text: "Explain the visible chart for study only. Separate visible evidence, related learning concepts, uncertainties, and study questions." }, sdkImage(image)],
  }], CHART_EDUCATION_INSTRUCTIONS, {
    output: Output.object({ schema: explanationSchema }),
    observeResponse: async (response) => {
      if (response.ok) return;
      upstreamStatus = response.status;
      try {
        const payload = await response.clone().json() as { message?: string; error?: { message?: string } };
        upstreamMessage = payload.message ?? payload.error?.message ?? upstreamMessage;
      } catch { /* Never leak a raw HTML/proxy response. */ }
      if (response.status === 402 || response.status === 403) {
        pauseTasks.push(supabaseAdmin.from("chart_ai_gate").upsert({ id: "chart-explanation", paused: true, status: response.status, reason: upstreamMessage, updated_at: new Date().toISOString() }));
      }
    },
  });
  try {
    const output = await call.result.output;
    const reason = await call.result.finishReason;
    if (reason === "content-filter") return fail("The model declined this screenshot. No explanation was generated.", 422);
    return { explanation: normalizeExplanation(output), error: null, status: 200 };
  } catch (error) {
    if (request.signal.aborted) return fail("Explanation stopped.", 499);
    if (NoObjectGeneratedError.isInstance(error)) {
      if (!error.text) return fail("The model could not produce an explanation for this screenshot.", 422);
      try {
        return { explanation: normalizeExplanation(JSON.parse(error.text)), error: null, status: 200 };
      } catch { return fail("No educational explanation could be safely produced for this image.", 422); }
    }
    if (error instanceof Error && error.message.includes("educational-only safeguards")) return fail(error.message, 422);
    return fail(upstreamMessage, upstreamStatus);
  } finally {
    await Promise.all(pauseTasks);
  }
}