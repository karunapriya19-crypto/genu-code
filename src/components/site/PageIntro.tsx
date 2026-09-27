import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="page-intro-glass relative isolate overflow-hidden border-b border-border py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group mb-9 inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary sm:mb-12"><ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden /> Home</Link>
        <div className="max-w-3xl border-l-2 border-primary/50 pl-5 sm:pl-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-primary/70" aria-hidden />
            <p className="font-mono text-[11px] font-bold uppercase text-primary">{eyebrow}</p>
          </div>
          <h1 className="text-3xl font-black leading-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
        </div>
      </div>
      <div className="page-intro-line pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden />
    </div>
  );
}