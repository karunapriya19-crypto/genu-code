import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, LoaderCircle, ShieldCheck, Sparkles, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { explainChart } from "@/lib/chart-explanation.functions";
import { validateChartFile, type ChartExplanation } from "@/lib/chart-explanation";

export function ChartExplainer() {
  const explain = useServerFn(explainChart);
  const inputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const selectionRef = useRef(0);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [result, setResult] = useState<ChartExplanation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => { data.subscription.unsubscribe(); controllerRef.current?.abort(); };
  }, []);

  async function selectFile(file: File | undefined) {
    if (!file || loading) return;
    const selection = ++selectionRef.current;
    setError(null); setResult(null); setImage(null); setName(""); setReading(true);
    try {
      validateChartFile(file.type, file.size);
      const bitmap = await createImageBitmap(file);
      const width = bitmap.width; const height = bitmap.height;
      bitmap.close();
      if (width < 100 || height < 100 || width * height > 25000000) throw new Error("Choose a readable chart between 100 pixels and 25 megapixels.");
      const value = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("The screenshot could not be read."));
        reader.onerror = () => reject(new Error("The screenshot could not be read."));
        reader.readAsDataURL(file);
      });
      if (selection !== selectionRef.current) return;
      setImage(value); setName(file.name);
    } catch (cause) {
      if (selection === selectionRef.current) setError(cause instanceof Error ? cause.message : "The screenshot could not be read.");
    } finally { if (selection === selectionRef.current) setReading(false); }
  }

  async function signIn() {
    setError(null); setAuthLoading(true);
    try {
      const response = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + window.location.pathname });
      if (response.error) throw response.error;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Sign-in could not be completed."); }
    finally { setAuthLoading(false); }
  }

  async function analyze() {
    if (!image || loading) return;
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true); setError(null); setResult(null);
    try {
      const response = await explain({ data: { image }, signal: controller.signal });
      if (controller.signal.aborted) return;
      if (response.error) setError(response.error);
      else if (response.explanation) setResult(response.explanation);
      else setError("No explanation was generated.");
    } catch (cause) {
      if (!controller.signal.aborted) setError(cause instanceof Error && !cause.message.includes("Supabase") ? cause.message : "The explanation could not be completed. Please sign in again or try later.");
    } finally {
      if (controllerRef.current === controller) { setLoading(false); controllerRef.current = null; }
    }
  }

  return <section id="chart-explainer" aria-labelledby="chart-explainer-title" className="border-y border-border bg-surface-strong py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div><p className="font-mono text-xs font-bold uppercase text-primary">Chart study · AI-powered</p><h2 id="chart-explainer-title" className="mt-2 text-3xl font-black">Understand your chart</h2><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Visible patterns, learning concepts, and uncertainty — not trade recommendations.</p></div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="size-4" aria-hidden /> Education only</span>
      </div>
      <div className="grid min-w-0 gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <input ref={inputRef} id="chart-screenshot" aria-label="Chart screenshot" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={loading} onChange={(e) => { void selectFile(e.target.files?.[0]); e.target.value = ""; }} />
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-md border border-dashed border-primary/40 bg-surface p-5" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); void selectFile(e.dataTransfer.files[0]); }}>
            {image ? <img src={image} alt="Selected chart screenshot" className="max-h-96 w-full object-contain" /> : <><ImagePlus className="size-10 text-primary" aria-hidden /><span className="text-sm text-muted-foreground">PNG, JPEG or WebP · up to 5 MB</span></>}
            <Button variant="outline" disabled={loading || reading} onClick={() => inputRef.current?.click()}><ImagePlus aria-hidden /> {reading ? "Reading screenshot…" : image ? "Replace screenshot" : "Choose screenshot"}</Button>
          </div>
          {image && <div className="mt-3 flex min-w-0 items-center justify-between gap-3"><p className="truncate text-xs text-muted-foreground">{name}</p><Button variant="ghost" size="icon" title="Remove screenshot" aria-label="Remove screenshot" disabled={loading} onClick={() => { selectionRef.current++; setImage(null); setName(""); setResult(null); setError(null); }}><X aria-hidden /></Button></div>}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Remove names, account details, and balances before uploading. Analysis sends the image to Lovable AI; the app does not save the screenshot or explanation.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {signedIn ? <Button disabled={!image || reading || loading} onClick={() => void analyze()}>{loading ? <LoaderCircle className="animate-spin" aria-hidden /> : <Sparkles aria-hidden />}{loading ? "Explaining chart…" : "Explain chart"}</Button> : <Button disabled={authLoading} onClick={() => void signIn()}>{authLoading && <LoaderCircle className="animate-spin" aria-hidden />}Continue with Google</Button>}
            {loading && <Button variant="outline" onClick={() => { controllerRef.current?.abort(); setError("Explanation stopped."); }}><Square aria-hidden /> Stop</Button>}
            {signedIn && !loading && <Button variant="ghost" onClick={() => void supabase.auth.signOut().then(({ error: signOutError }) => { if (signOutError) setError("Sign-out could not be completed."); else { setResult(null); setImage(null); } })}>Sign out</Button>}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">10 explanations per student per hour. AI usage draws workspace credits.</p>
          {error && <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">{error}</p>}
        </div>
        <div className="min-w-0" aria-live="polite" aria-busy={loading}>
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4"><Sparkles className="size-5 text-primary" aria-hidden /><h3 className="font-bold">Study notes</h3></div>
          {loading ? <div className="flex min-h-48 items-center gap-3 text-sm text-muted-foreground"><LoaderCircle className="size-5 animate-spin text-primary" aria-hidden /> Reading visible evidence and checking educational boundaries…</div> : result ? <>
            {!result.isChart && <p className="mb-5 text-sm text-notice-foreground">This image is not a readable chart.</p>}
            <Notes title="Visible evidence" items={result.observations} /><Notes title="Related learning concepts" items={result.concepts} /><Notes title="Uncertainty & missing context" items={result.limitations} /><Notes title="Study questions" items={result.questions} />
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">AI can misread charts. These notes are educational, not financial advice, predictions, or a reason to place a trade.</p>
          </> : <p className="mt-8 text-sm leading-relaxed text-muted-foreground">No chart explanation yet.</p>}
        </div>
      </div>
    </div>
  </section>;
}

function Notes({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <div className="mb-6"><h4 className="mb-3 font-mono text-xs font-bold uppercase text-primary">{title}</h4><ul className="space-y-3">{items.map((item, index) => <li key={index} className="border-l-2 border-border pl-4 text-sm leading-relaxed text-foreground [overflow-wrap:anywhere]">{item}</li>)}</ul></div>;
}